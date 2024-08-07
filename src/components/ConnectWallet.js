// src/components/ConnectWallet.js

import React, { useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";

function ConnectWallet() {
  const { connectWallet } = useContext(Web3Context);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-md text-center border border-gray-700'>
        <h1 className='text-2xl font-bold text-blue-400 mb-6'>
          Welcome to MetaCircle
        </h1>
        <p className='mb-6 text-gray-300'>
          Connect your MetaMask wallet to get started
        </p>
        <button
          onClick={connectWallet}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'
        >
          Connect MetaMask
        </button>
      </div>
    </div>
  );
}

export default ConnectWallet;
