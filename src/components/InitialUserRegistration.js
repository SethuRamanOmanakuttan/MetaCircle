// src/components/InitialUserRegistration.js

import React, { useState, useContext, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LoadingOverlay from "./LoadingOverlay";

function InitialUserRegistration({ onRegistrationComplete }) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { contract, account } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      if (contract && account) {
        const user = await contract.users(account);
        if (user.username !== "") {
          onRegistrationComplete();
        }
      }
    };
    checkRegistration();
  }, [contract, account, onRegistrationComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      setIsLoading(true);
      try {
        await contract.createUser(username, bio);
        alert("User registered successfully!");
        onRegistrationComplete();
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      {isLoading && <LoadingOverlay />}
      <div className='bg-gray-800 p-8 rounded-lg shadow-xl w-96 border border-gray-700'>
        <h2 className='text-2xl font-bold mb-4 text-blue-400'>
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-300 text-sm font-bold mb-2'
              htmlFor='username'
            >
              Username
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 hover:text-gray-200'
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Choose a username'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-300 text-sm font-bold mb-2'
              htmlFor='bio'
            >
              Bio
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-200'
              id='bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              placeholder='Tell us about yourself'
              rows='3'
            />
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150 ease-in-out'
            type='submit'
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default InitialUserRegistration;
