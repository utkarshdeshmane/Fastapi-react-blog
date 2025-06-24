import React, { useState, useEffect } from 'react';
import './Post.css';
import './index.css'; // or './tailwind.css'


const BASE_URL = 'http://localhost:1111/';

function Post({ post }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (post.image_url) {
      setImageUrl(BASE_URL + post.image_url);
    }
  }, [post.image_url]);

  const handleDelete = (event) => {
    event?.preventDefault();

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    fetch(BASE_URL + 'post/' + post.id, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch(error => {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
      });
  };

  return (
    <div className="post">
      {imageUrl && (
        <img
          className="post_image"
          src={imageUrl}
          alt={post.title || 'Post image'}
        />
      )}
      <div className="post_content">
        <div className="post_title">{post.title}</div>
        <div className="post_creator">by {post.creator}</div>
        <div className="post_text">{post.content}</div>
        <div className="post_delete">
          <button onClick={handleDelete}>Delete post</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
