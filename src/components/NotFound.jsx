import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">404 - Page Not Found</h2>
        <p className="text-gray-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
