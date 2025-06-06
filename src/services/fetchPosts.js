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
    const endpoint = isProduction || isNetlifyDev ? '/posts' : '/posts';
    console.log(`Fetching posts from: ${API_URL}${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || 'Failed to fetch posts';
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} posts`);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};