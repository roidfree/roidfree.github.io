// fetchPosts.js
// For local development with netlify dev
const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8888/.netlify/functions' 
  : '/.netlify/functions';

export const fetchPosts = async () => {
  try {
    console.log('Fetching posts from:', `${API_URL}/posts`);
    
    const response = await fetch(`${API_URL}/posts`);
    
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