# Portfolio Website with Netlify Serverless Functions

This is a React + Vite portfolio website that uses Netlify serverless functions to fetch data from Notion.

## Features

- React + Vite for fast development and optimized builds
- Netlify serverless functions for backend API
- Notion integration for content management
- Responsive design
- Contact form with EmailJS

## Development

To start the development server:

```bash
npm run dev
```

To test with Netlify functions locally:

```bash
npm run netlify:dev
```

## Deployment

This project is configured for deployment on Netlify. See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for detailed deployment instructions.

## Environment Variables

Create a `.env` file based on the `.env.example` template and fill in your credentials:

```
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_TEMPLATE_ID=template_neurotech_unplugged

# Notion API (for frontend)
VITE_NOTION_API_KEY=your_notion_api_key_here
VITE_DATABASE_ID=your_database_id_here

# Notion API (for serverless functions)
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

## Project Structure

- `/src` - Frontend React code
- `/.netlify/functions` - Netlify serverless functions
- `/backend` - Legacy backend code (replaced by Netlify functions)
