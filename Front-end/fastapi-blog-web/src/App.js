import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';

const BASE_URL = 'http://localhost:8000/'

function App() {

  const[posts, setPosts] = useState([])

  useEffect(() => {
  fetch(BASE_URL + 'post/all')
    .then(async response => {
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        return json;
      }
      throw json;
    })
    .then(data => {
      setPosts(data.reverse());
    })
    .catch(error => {
      console.error("Fetch error:", error);
      alert("Failed to load posts.");
    });
}, []);


  return (
    <div className="App">
      <div className='blog_title'>Open City Blog</div>
      <div className='app_posts'>
        {
          posts.map(post => (
            <Post post={post} />
          ))
        }
      </div>
      <div className='new_post'>
        <NewPost />
      </div>
    </div>
  );
}

export default App;
