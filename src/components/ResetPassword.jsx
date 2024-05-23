import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URI } from '../../url.config';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${API_URI}/user/reset-password`, { email });
      console.log(response)
      if (response.status === 200) {
        toast.success(
          'Password reset successful',
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        navigate('/login');
      }
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error('Failed to reset password',
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div> */}
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
