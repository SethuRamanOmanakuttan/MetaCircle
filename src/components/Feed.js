// src/components/Feed.js

import React, { useState, useEffect, useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([]);
  const { contract } = useContext(Web3Context);

  useEffect(() => {
    const fetchPosts = async () => {
      if (contract) {
        try {
          const postCount = Number(await contract.postCount());
          const fetchedPosts = [];
          for (let i = postCount; i > postCount - 10 && i > 0; i--) {
            const post = await contract.posts(i);
            fetchedPosts.push({ ...post, postId: i });
          }
          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };
    fetchPosts();
  }, [contract]);

  return (
    <div className='w-1/2 mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-blue-400'>Recent Posts</h2>
      {posts.map((post) => (
        <Post key={post.postId.toString()} post={post} />
      ))}
    </div>
  );
}

export default Feed;
