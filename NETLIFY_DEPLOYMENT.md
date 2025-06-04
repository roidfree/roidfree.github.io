# Netlify Deployment Guide

This document explains how to deploy this application to Netlify, with a focus on the serverless functions that replace the traditional backend server.

## Overview

The application has been configured to use Netlify serverless functions instead of a traditional Express server. This allows the application to be deployed as a static site with dynamic API endpoints.

## Changes Made

1. Created a Netlify serverless function in `.netlify/functions/posts.mjs` that replaces the Express server in `backend/server.cjs`.
   - Used ES modules (`.mjs` extension) for better compatibility with the project's module system.
2. Updated the frontend API service in `src/services/fetchPosts.js` to use the Netlify function URL in both production and when running under Netlify dev.
3. Added Netlify-specific scripts to `package.json`.
4. Configured `netlify.toml` to specify the functions directory.

## Environment Variables

The following environment variables need to be set in the Netlify dashboard:

- `NOTION_API_KEY`: Your Notion API key
- `NOTION_DATABASE_ID`: The ID of your Notion database

## Deployment Steps

1. **Set up Netlify CLI (if not already done)**:
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **Initialize Netlify site (if not already done)**:
   ```bash
   netlify init
   ```

3. **Test locally**:
   ```bash
   npm run netlify:dev
   ```
   This will start a local development server that simulates the Netlify environment, including the serverless functions.

4. **Test the function directly**:
   ```bash
   npm run test:function
   ```
   This will run the `netlify-function-test.js` script to test the posts function directly.

5. **Deploy to Netlify**:
   ```bash
   npm run netlify:deploy
   ```
   Or for production deployment:
   ```bash
   npm run netlify:deploy --prod
   ```

6. **Set environment variables in Netlify dashboard**:
   - Go to your site settings in the Netlify dashboard
   - Navigate to "Build & deploy" > "Environment"
   - Add the required environment variables:
     - `NOTION_API_KEY`
     - `NOTION_DATABASE_ID`

## Troubleshooting

- **Function not found**: Make sure the function is in the correct directory (`.netlify/functions/`) with the correct file extension (`.mjs`).
- **CORS errors**: The function includes CORS headers, but you may need to adjust them based on your specific requirements.
- **Environment variables not working**: Double-check that you've set them correctly in the Netlify dashboard.
- **Function timeout**: If your function is timing out, you may need to optimize it or increase the timeout in `netlify.toml`.

## Local Development

For local development, you can use:

```bash
npm run netlify:dev
```

This will start a local server that simulates the Netlify environment, including the serverless functions. Your frontend code will be able to access the functions at `/.netlify/functions/posts` just like in production.

You can also test the function directly without starting the full development server:

```bash
npm run test:function
```

This will run the `netlify-function-test.js` script, which imports and executes the function directly.

## ES Modules Configuration

This project uses ES modules throughout:

1. The main project is configured with `"type": "module"` in `package.json`.
2. The Netlify function uses the `.mjs` extension to ensure it's treated as an ES module.
3. The test script uses the `--experimental-vm-modules` flag to support ES modules.

This configuration ensures consistency across the codebase and avoids module system conflicts.
