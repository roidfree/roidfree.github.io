import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from 'fs';
import path from 'path';
import readingTime from 'reading-time';
import { config } from 'dotenv';
import { parseArgs } from 'node:util';
import { sanitizeUrl, sanitizeImageString } from './helpers/sanitize.mjs';
import { hashString, downloadImage } from './helpers/images.mjs';
import { delay } from './helpers/delay.mjs';

// Input Arguments
const ARGUMENT_OPTIONS = {
  published: { // Only sync published posts
    type: 'boolean',
    short: 'p'
  },
  force: { // Force overwrite existing files
    type: 'boolean',
    short: 'f'
  },
  verbose: { // Verbose logging
    type: 'boolean',
    short: 'v'
  }
};

const { values: { published, force, verbose } } = parseArgs({ options: ARGUMENT_OPTIONS });
const isPublished = !!published;
const forceOverwrite = !!force;
const isVerbose = !!verbose;

console.log(`Syncing Published Only: ${isPublished}`);
console.log(`Force Overwrite: ${forceOverwrite}`);
console.log(`Verbose Logging: ${isVerbose}`);

// Load ENV Variables
config();
if (!process.env.NOTION_KEY || !process.env.DATABASE_ID) {
  throw new Error("Missing required environment variables: NOTION_KEY and DATABASE_ID");
}

const NOTION_KEY = process.env.NOTION_KEY;
const DATABASE_ID = process.env.DATABASE_ID;
const POSTS_PATH = process.env.POSTS_PATH || `src/pages/posts`;
const IMAGES_PATH = process.env.IMAGES_PATH || `./images`;
const THROTTLE_DURATION = parseInt(process.env.THROTTLE_DURATION) || 334; // ms

// Ensure directories exist
if (!fs.existsSync(POSTS_PATH)) {
  fs.mkdirSync(POSTS_PATH, { recursive: true });
}
if (!fs.existsSync(IMAGES_PATH)) {
  fs.mkdirSync(IMAGES_PATH, { recursive: true });
}

const notion = new Client({
  auth: NOTION_KEY,
  config: {
    parseChildPages: false,
  }
});

// Enhanced logging function
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  
  if (level === 'debug' && !isVerbose) return;
  
  console.log(`${prefix} ${message}`);
  if (data && isVerbose) {
    console.log(JSON.stringify(data, null, 2));
  }
}

// Error handling wrapper
async function withErrorHandling(fn, context) {
  try {
    return await fn();
  } catch (error) {
    log('error', `Error in ${context}: ${error.message}`);
    if (isVerbose) {
      console.error(error.stack);
    }
    throw error;
  }
}

// Notion Custom Block Transform START
const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer("embed", async (block) => {
  const { embed } = block;
  if (!embed?.url) return "";
  
  // Sanitize URL for security
  const sanitizedUrl = sanitizeUrl(embed.url);
  const caption = embed.caption ? await n2m.blockToMarkdown(embed.caption) : '';
  
  return `<figure>
  <iframe src="${sanitizedUrl}" loading="lazy"></iframe>
  ${caption ? `<figcaption>${caption}</figcaption>` : ''}
</figure>`;
});

n2m.setCustomTransformer("image", async (block) => {
  return await withErrorHandling(async () => {
    const { image, id } = block;
    const imageUrl = image?.file?.url || image?.external?.url;
    
    if (!imageUrl) {
      log('warn', `No image URL found for block ${id}`);
      return '';
    }
    
    const imageFileName = sanitizeImageString(imageUrl.split('/').pop());
    const filePath = await downloadImage(imageUrl, `${IMAGES_PATH}/${imageFileName}`);
    const fileName = filePath.split('/').pop();

    return `<Image src="/images/posts/${fileName}" alt="${image.caption?.[0]?.plain_text || ''}" />`;
  }, `image transformer for block ${block.id}`);
});

n2m.setCustomTransformer("video", async (block) => {
  const { video } = block;
  if (!video?.external?.url) return '';
  
  const { caption, external: { url: videoUrl } } = video;
  let url = sanitizeUrl(videoUrl);

  // Enhanced YouTube URL handling
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId;
    
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('/watch')) {
      videoId = url.split('&')[0].split('?v=')[1];
    } else if (url.includes('/embed/')) {
      // Already in embed format
      return `<iframe width="100%" height="480" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`;
    }
    
    if (videoId) {
      url = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  const captionText = caption ? await n2m.blockToMarkdown(caption) : '';
  
  return `<figure>
  <iframe width="100%" height="480" src="${url}" title="Video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
  ${captionText ? `<figcaption>${captionText}</figcaption>` : ''}
</figure>`;
});

// Notion Custom Block Transform END

async function fetchNotionPages() {
  const queryParams = {
    database_id: DATABASE_ID,
    sorts: [
      {
        property: 'Publish Date',
        direction: 'descending'
      }
    ]
  };

  if (isPublished) {
    queryParams.filter = {
      "and": [
        {
          "property": "Status",
          "status": {
            equals: 'Published'
          }
        },
        {
          "property": "Initiative",
          "multi_select": {
            contains: 'ANA'
          }
        }
      ]
    };
  }

  return await withErrorHandling(async () => {
    const response = await notion.databases.query(queryParams);
    log('info', `Fetched ${response.results.length} pages from Notion`);
    return response.results;
  }, 'fetching Notion pages');
}

function createPageObject(page) {
  const { properties, cover, created_time, last_edited_time, icon, archived } = page;
  const title = properties['Title']?.title?.[0]?.plain_text || 'Untitled';
  const slug = properties?.slug?.rich_text?.[0]?.plain_text || sanitizeUrl(title);

  log('debug', `Processing page: ${title}`, { pageId: page.id, slug });

  // Extract clean tag names only
  const tags = properties['Tags']?.multi_select?.map(tag => tag.name) || [];
  
  // Extract clean icon data
  const cleanIcon = icon ? {
    type: icon.type,
    [icon.type]: icon[icon.type]
  } : null;

  return {
    id: page.id,
    title: title.replace(/"/g, '\\"'), // Escape quotes in title
    type: page.object,
    cover: cover?.external?.url || cover?.file?.url || properties['Featured Image']?.url,
    tags: tags,
    created_time,
    last_edited_time,
    icon: cleanIcon,
    archived,
    status: properties['Status']?.status?.name,
    date: properties['Publish Date']?.date?.start,
    description: (properties['Summary']?.rich_text?.[0]?.plain_text || '').replace(/"/g, '\\"'),
    slug,
  };
}

async function processPage(page) {
  const filePath = path.join(process.cwd(), POSTS_PATH, `${page.slug}.mdx`);
  
  // Check if file exists and skip if not forcing overwrite
  if (fs.existsSync(filePath) && !forceOverwrite) {
    log('info', `Skipping existing file: ${page.slug}.mdx (use --force to overwrite)`);
    return;
  }

  log('info', `Processing: ${page.title} [${page.id}]`);

  return await withErrorHandling(async () => {
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const { parent: mdString } = n2m.toMarkdownString(mdblocks);

    if (!mdString || mdString.trim() === '') {
      log('warn', `No content found for page ${page.id} (${page.title})`);
      return;
    }

    const estimatedReadingTime = readingTime(mdString).text;

    // Download Cover Image
    let coverFileName = '';
    if (page.cover) {
      try {
        const fullPath = await downloadImage(page.cover, { isCover: true });
        // Extract relative path from project root
        const projectRoot = process.cwd();
        coverFileName = fullPath.replace(projectRoot, '').replace(/\\/g, '/');
        // Keep slash
        log('info', `Cover image downloaded: ${coverFileName}`);
      } catch (error) {
        log('warn', `Failed to download cover image for ${page.title}: ${error.message}`);
      }
    }

    // Generate page contents with proper escaping
    const pageContents = `---
layout: "../../layouts/PostLayout.astro"
id: "${page.id}"
slug: "${page.slug}"
title: "${page.title}"
cover: "${coverFileName || ''}"
tags: [${page.tags.map(tag => `"${tag}"`).join(', ')}]
created_time: "${page.created_time}"
last_edited_time: "${page.last_edited_time}"
icon: ${page.icon ? JSON.stringify(page.icon) : 'null'}
archived: ${page.archived}
status: "${page.status || ''}"
publish_date: "${page.date || ''}"
description: "${page.description}"
reading_time: "${estimatedReadingTime}"
---
import Image from '../../components/Image.astro';

${mdString}
`;

    fs.writeFileSync(filePath, pageContents, 'utf8');
    log('info', `Successfully created: ${page.slug}.mdx`);

  }, `processing page ${page.title}`);
}

// Main execution
async function main() {
  try {
    log('info', 'Starting Notion sync process...');
    
    const results = await fetchNotionPages();
    const pages = results.map(createPageObject);
    
    log('info', `Processing ${pages.length} pages...`);
    
    let processed = 0;
    let skipped = 0;
    let errors = 0;

    for (const page of pages) {
      try {
        await processPage(page);
        processed++;
      } catch (error) {
        log('error', `Failed to process page ${page.title}: ${error.message}`);
        errors++;
      }

      log('debug', `Throttling for ${THROTTLE_DURATION}ms...`);
      await delay(THROTTLE_DURATION);
    }

    log('info', `Sync completed! Processed: ${processed}, Errors: ${errors}`);
    log('info', 'Successfully synced posts with Notion');

  } catch (error) {
    log('error', `Fatal error during sync: ${error.message}`);
    process.exit(1);
  }
}

main();