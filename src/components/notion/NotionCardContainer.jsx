import React, { useState, useEffect } from 'react';
import NotionCard from './NotionCard';
import { fetchPosts } from '../../services/fetchPosts';
import './NotionCardContainer.css';

const NotionCardContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (!import.meta.env.VITE_NOTION_API_KEY) {
          const errorMsg = 'VITE_NOTION_API_KEY is not set in environment variables';
          console.error(errorMsg);
          setError(errorMsg);
          setLoading(false);
          return;
        }
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="notion-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="notion-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="notion-container">
      <div className="notion-grid">
        {posts.map((post) => (
          <NotionCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default NotionCardContainer;
