// src/components/Header.js

import React, { useContext, useState, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";
import CreatePost from "./CreatePost";
import CreateGroup from "./CreateGroup";

function Header() {
  const { account, disconnectWallet, contract } = useContext(Web3Context);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarColor, setAvatarColor] = useState("#000000");

  useEffect(() => {
    const fetchUserData = async () => {
      if (contract && account) {
        try {
          const user = await contract.users(account);
          setUsername(user.username);
          setBio(user.bio);
          setAvatarColor(generateRandomColor());
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [contract, account]);

  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <header className='bg-gray-800 shadow-md text-white p-4 border border-gray-700'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-blue-400'>MetaCircle</h1>
        {account && (
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => setShowCreatePost(true)}
              className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm border border-blue-600'
            >
              Create Post
            </button>
            <button
              onClick={() => setShowCreateGroup(true)}
              className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm border border-blue-600'
            >
              Create Group
            </button>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className='relative'
            >
              <div
                style={{ backgroundColor: avatarColor }}
                className='w-10 h-10 rounded-full flex items-center justify-center text-white font-bold'
              >
                {username.charAt(0).toUpperCase()}
              </div>
            </button>
          </div>
        )}
      </div>
      {showProfile && (
        <div className='absolute right-4 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700'>
          <div className='px-4 py-2 text-sm text-gray-300'>
            <div
              style={{ backgroundColor: avatarColor }}
              className='w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-2xl'
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <p className='text-center font-bold'>{username}</p>
            <p className='text-center text-xs mt-1'>{bio}</p>
            <p className='text-center text-xs mt-1'>
              {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          </div>
          <button
            onClick={() => {
              disconnectWallet();
              setShowProfile(false);
            }}
            className='block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700'
          >
            Sign out
          </button>
        </div>
      )}
      {showCreatePost && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700'>
            <CreatePost onClose={() => setShowCreatePost(false)} />
          </div>
        </div>
      )}
      {showCreateGroup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700'>
            <CreateGroup onClose={() => setShowCreateGroup(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
