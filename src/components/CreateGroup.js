// src/components/CreateGroup.js

import React, { useState, useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LoadingOverlay from "./LoadingOverlay";

function CreateGroup({ onClose }) {
  const [groupName, setGroupName] = useState("");
  const { contract } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract && groupName.trim()) {
      setIsLoading(true);
      try {
        await contract.createGroup(groupName);
        onClose();
      } catch (error) {
        console.error("Error creating group:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold text-blue-400'>Create Group</h2>
        <button onClick={onClose} className='text-gray-400 hover:text-gray-200'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            ></path>
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-gray-700 text-white border-gray-600'
          type='text'
          placeholder='Group Name'
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
          maxLength={50}
        />
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-blue-600'
          type='submit'
        >
          Create Group
        </button>
      </form>
    </div>
  );
}

export default CreateGroup;
