// fetchPosts.js
const API_URL = 'http://localhost:3001/api';

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    
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
