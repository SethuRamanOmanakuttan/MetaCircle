// src/components/Post.js

import React, { useContext, useState, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LoadingOverlay from "./LoadingOverlay";
import { ethers } from "ethers";

function Post({ post, refreshPosts }) {
  const { contract, account } = useContext(Web3Context);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (contract) {
        try {
          const likesCount = await contract.getPostLikes(post.postId);
          const commentsCount = await contract.getPostComments(post.postId);
          const userLiked = await contract.isPostLikedByUser(
            post.postId,
            account
          );
          setLikes(Number(likesCount));
          setHasLiked(userLiked);

          // Fetch all comments for this post
          const fetchedComments = [];
          for (let i = 1; i <= commentsCount; i++) {
            const comment = await contract.comments(i);
            if (comment.postId.toString() === post.postId.toString()) {
              fetchedComments.push(comment);
            }
          }
          setComments(fetchedComments);
        } catch (error) {
          console.error("Error fetching post details:", error);
        }
      }
    };
    fetchPostDetails();
  }, [contract, post.postId, account, reloadData]);

  const handleLike = async () => {
    if (contract) {
      setIsLoading(true);
      try {
        if (hasLiked) {
          let txn = await contract.unlikePost(post.postId);
          const recepit = await txn.wait(2);
          console.log(recepit);
          setReloadData(!reloadData);
        } else {
          let txn = await contract.likePost(post.postId);
          const recepit = await txn.wait(2);
          console.log(recepit);
          setReloadData(!reloadData);
        }
      } catch (error) {
        console.error("Error liking/unliking post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleComment = async () => {
    if (contract && commentContent.trim()) {
      setIsLoading(true);
      try {
        let txn = await contract.commentOnPost(post.postId, commentContent);
        const recepit = await txn.wait(2);
        console.log(recepit);
        setCommentContent("");
        setShowCommentInput(false);
        setReloadData(!reloadData);
      } catch (error) {
        console.error("Error commenting on post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatAddress = (address) => {
    return `${String(address).slice(0, 6)}...${String(address).slice(-4)}`;
  };

  return (
    <div className='bg-gray-800 shadow-md rounded-lg px-6 py-4 mb-4 border border-gray-700'>
      {isLoading && <LoadingOverlay message='Transaction in progress...' />}
      <div className='flex items-center mb-3'>
        <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3'>
          {formatAddress(post[1])[0].toUpperCase()}
        </div>
        <div>
          <p className='font-semibold text-gray-200'>
            {formatAddress(post[1])}
          </p>
        </div>
      </div>
      <p className='text-gray-300 mb-4'>{post[2]}</p>
      <div className='flex items-center mb-2'>
        <button
          onClick={handleLike}
          className={`flex items-center ${
            hasLiked ? "text-blue-400" : "text-gray-400"
          } hover:text-blue-500 transition duration-150 ease-in-out mr-4`}
        >
          <svg
            className='w-5 h-5 mr-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
          </svg>
          <span>{likes}</span>
        </button>

        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className='text-gray-400 hover:text-blue-500 flex items-center transition duration-150 ease-in-out'
        >
          <svg
            className='w-5 h-5 mr-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
            />
          </svg>
          <span>{comments.length}</span>
        </button>
      </div>
      {showCommentInput && (
        <div className='mt-4'>
          <h3 className='text-gray-300 font-semibold mb-2'>Comments:</h3>
          {comments.map((comment, index) => (
            <div key={index} className='bg-gray-700 rounded p-2 mb-2'>
              <p className='text-gray-300 text-sm'>
                <span className='font-semibold'>
                  {formatAddress(comment.author)}:
                </span>{" "}
                {comment.content}
              </p>
            </div>
          ))}
          <textarea
            className='w-full bg-gray-700 text-gray-200 border border-gray-600 rounded p-2 mt-2'
            rows='2'
            placeholder='Write a comment...'
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <button
            onClick={handleComment}
            className='mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-150 ease-in-out'
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
