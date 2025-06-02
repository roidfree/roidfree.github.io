import React from 'react';
import './NotionCard.css';

const NotionCard = ({ post }) => {
  return (
    <a 
      href={post.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="notion-card"
    >
      {post.coverImage && (
        <div className="notion-card-cover">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="notion-card-image"
          />
        </div>
      )}
      <div className="notion-card-content">
        <h3 className="notion-card-title">{post.title}</h3>
        <p className="notion-card-description">{post.description}</p>
        <div className="notion-card-meta">
          <span className="notion-card-date">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </a>
  );
};

export default NotionCard;
