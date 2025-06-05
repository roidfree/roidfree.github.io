# AstroNot Setup Guide

This project now includes AstroNot integration for syncing blog posts from Notion to your Astro site.

## Setup Instructions

### 1. Configure Notion

1. Create a Notion integration at https://www.notion.so/my-integrations
2. Copy your "Internal Integration Token" 
3. Create a database in Notion for your blog posts with these properties:
   - `title` (Title)
   - `slug` (Rich text) - optional, will auto-generate from title
   - `status` (Select) - with options like "draft", "published"
   - `publish_date` (Date)
   - `description` (Rich text)
   - `tags` (Multi-select)
4. Share your database with your integration
5. Copy the database ID from the URL

### 2. Configure Environment Variables

Update the `.env` file with your actual Notion credentials:

```env
NOTION_KEY=your_actual_notion_integration_token
DATABASE_ID=your_actual_database_id
```

### 3. Available Commands

- `pnpm run sync` - Sync all posts from Notion (including drafts)
- `pnpm run sync:published` - Sync only published posts from Notion
- `pnpm run generate` - Full build process: clean, sync published posts, and build site
- `pnpm run build` - Build the site without syncing (uses existing posts)

### 4. Workflow

For development:
1. `pnpm run sync:published` - Sync posts from Notion
2. `pnpm run dev` - Start development server
3. Visit `/posts` to see your blog posts

For deployment:
1. `pnpm run generate` - This should be run on deploy instead of just `pnpm run build`

### 5. File Structure

```
src/
├── astronot.js           # Main sync script
├── helpers/              # Helper functions
│   ├── delay.mjs        # Rate limiting
│   ├── images.mjs       # Image processing
│   └── sanitize.mjs     # URL/string sanitization
├── components/
│   └── Image.astro      # Image component for posts
├── layouts/
│   └── PostLayout.astro # Layout for blog posts
└── pages/
    └── posts/
        ├── index.astro  # Blog posts listing page
        └── [generated].mdx # Auto-generated post files
```

### 6. Notion Database Schema

Your Notion database should have these properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| title | Title | Yes | Post title |
| slug | Rich text | No | URL slug (auto-generated if empty) |
| status | Select | Yes | "published", "draft", etc. |
| publish_date | Date | No | Publication date |
| description | Rich text | No | Post description/excerpt |
| tags | Multi-select | No | Post tags |

### 7. Customization

- Edit `src/layouts/PostLayout.astro` to customize post layout
- Edit `src/pages/posts/index.astro` to customize the posts listing
- Modify `src/astronot.js` to customize the sync behavior
- Add custom transformers in `astronot.js` for special Notion blocks

### 8. Deployment Notes

For platforms like Netlify and Vercel:
- Use `pnpm run generate` as your build command instead of `pnpm run build`
- This ensures posts are synced from Notion before building
- Make sure to set your environment variables in your deployment platform

## Troubleshooting

- If you get "API token is invalid" error, check your `NOTION_KEY` in `.env`
- If no posts appear, ensure your database is shared with the integration
- If images don't load, check that the `src/images/posts/` directory exists
- For rate limiting issues, the script includes automatic throttling
