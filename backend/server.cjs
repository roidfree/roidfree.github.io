require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');
const serverless = require('serverless-http');

const app = express();

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

    res.json(posts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch posts',
      message: error.message 
    });
  }
});

// Export the Express app wrapped in serverless-http
module.exports.handler = serverless(app);

// Optionally start the server locally if running directly
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
