// src/components/LoadingOverlay.js

import React from "react";

function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mb-4'></div>
        <p className='text-white'>{message}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
