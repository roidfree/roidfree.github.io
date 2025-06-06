# Netlify Serverless Functions

This directory contains serverless functions that are deployed to Netlify. These functions replace the traditional backend server and provide API endpoints that can be accessed from the frontend.

## Available Functions

### posts.mjs

This function fetches posts from a Notion database and returns them in a format that can be consumed by the frontend. It uses ES modules (`.mjs` extension) for better compatibility with the project's module system.

- **Endpoint**: `/.netlify/functions/posts`
- **Method**: GET
- **Response**: JSON array of posts

## Environment Variables

The functions require the following environment variables to be set in the Netlify dashboard:

- `NOTION_API_KEY`: Your Notion API key
- `NOTION_DATABASE_ID`: The ID of your Notion database

## Local Development

To test these functions locally, you can use the Netlify CLI:

```bash
netlify dev
```

This will start a local development server that simulates the Netlify environment, including the serverless functions.
