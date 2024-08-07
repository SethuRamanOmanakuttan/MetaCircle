// src/components/Group.js

import React, { useContext, useState } from "react";
import { Web3Context } from "../contexts/Web3Context";

function Group({ group, showJoinButton }) {
  const { contract, account } = useContext(Web3Context);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    if (contract) {
      setIsJoining(true);
      try {
        await contract.joinGroup(group.groupId);
        alert("Joined group successfully!");
      } catch (error) {
        console.error("Error joining group:", error);
        alert("Failed to join group. Please try again.");
      } finally {
        setIsJoining(false);
      }
    }
  };

  const formatAddress = (address) => {
    return `${String(address).slice(0, 3)}....${String(address).slice(-4)}`;
  };

  return (
    <div className='bg-gray-700 shadow-md rounded px-6 py-4 mb-4 border border-gray-600'>
      <h3 className='text-lg font-bold mb-2 text-blue-400'>{group[1]}</h3>
      <p className='text-sm text-gray-400 mb-3'>
        Created by: {formatAddress(group[2])}
      </p>
      {showJoinButton && (
        <button
          onClick={handleJoin}
          disabled={isJoining}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline border border-blue-600 disabled:opacity-50'
        >
          {isJoining ? "Joining..." : "Join Group"}
        </button>
      )}
    </div>
  );
}

export default Group;
