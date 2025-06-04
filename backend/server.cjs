// not being used // but kept for reference in case needed later
// This is a simple Express server that fetches posts from a Notion database
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

// API endpoint to fetch posts
app.get('/api/posts', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'Publish Date', direction: 'descending' }],
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

    res.json(posts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch posts',
      message: error.message 
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
