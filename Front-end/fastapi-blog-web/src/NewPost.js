import React, { useState } from "react";
import './NewPost.css';

const BASE_URL = 'http://localhost:1111/';

function NewPost() {
  const [image, setImage] = useState(null);
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreate = (e) => {
    e?.preventDefault();

    // ✅ Validate inputs
    if (!image || !creator || !title || !text) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    // ✅ Don't set Content-Type manually
    fetch(BASE_URL + 'post/image', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        // Proceed to create the actual post
        createPost(data.filename);
      })
      .catch(error => {
        console.error("Image upload failed:", error);
        alert("Image upload failed.");
      })
      .finally(() => {
        setImage(null);
        document.getElementById('fileInput').value = null;
      });
  };

  const createPost = (imageUrl) => {
    const payload = JSON.stringify({
      image_url: imageUrl,
      title: title,
      content: text,
      creator: creator
    });

    fetch(BASE_URL + 'post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        // Reset fields
        setCreator('');
        setTitle('');
        setText('');
        // Reload posts
        window.location.reload();
        window.scrollTo(0, 0);
      })
      .catch(error => {
        console.error("Post creation failed:", error);
        alert("Post creation failed.");
      });
  };

  return (
    <div className="newpost_content">
      <div className="newpost_image">
        <input type="file" id="fileInput" onChange={handleImageUpload} />
      </div>
      <div className="newpost_creator">
        <input
          className="newpost_creator"
          type="text"
          id="creator_input"
          placeholder="Creator"
          onChange={(e) => setCreator(e.target.value)}
          value={creator}
        />
      </div>
      <div className="newpost_title">
        <input
          className="newpost_title"
          type="text"
          id="title_input"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="newpost_text">
        <textarea
          className="newpost_text"
          rows="10"
          id="content_input"
          placeholder="Content"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div>
        <button className="create_button" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default NewPost;
