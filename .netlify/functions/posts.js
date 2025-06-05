// .netlify/functions/posts.js
require('dotenv').config();
const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('Fetching posts from Notion...');
    
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'Publish Date', direction: 'descending' }],
      filter: {
        and: [
          {
            property: 'Status',
            status: {
              equals: 'Published',
            },
          },
          {
            property: 'Initiative',
            multi_select: {
              contains: 'ANA',
            },
          },
        ]
      },
    });

    if (!response || !response.results) {
      throw new Error('Invalid response from Notion API');
    }

    const posts = response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props['Title']?.title?.[0]?.plain_text || 'Untitled',
        description: props['Summary']?.rich_text?.[0]?.plain_text || '',
        date: props['Publish Date']?.date?.start || '',
        tags: props['Tags']?.multi_select?.map(tag => tag.name) || [],
        coverImage: props['Featured Image']?.url || null,
        url: `https://notion.so/${page.id.replace(/-/g, '')}`,
      };
    }).filter(Boolean);

    console.log(`Successfully fetched ${posts.length} posts`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(posts),
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch posts',
        message: error.message,
      }),
    };
  }
};