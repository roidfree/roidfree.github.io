// fetchPosts.js
// Check if we're running under Netlify dev or in production
const isNetlifyDev = window.location.port === '8888'; // Netlify dev runs on port 8888 by default
const isProduction = process.env.NODE_ENV === 'production';

// Use Netlify functions URL if we're in production or running under Netlify dev
const API_URL = isProduction || isNetlifyDev
  ? '/.netlify/functions'
  : 'http://localhost:3001/api';

export const fetchPosts = async () => {
  try {
    // For Netlify (production or dev), the endpoint is just 'posts' (the function name)
    // For regular local development, it's '/posts'
    const endpoint = isProduction || isNetlifyDev ? 'posts' : '/posts';
    console.log(`Fetching posts from: ${API_URL}${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch posts');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
