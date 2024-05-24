import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URI } from '../../url.config';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Email is required", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URI}/user/reset-password`, { email });
      if (response.status === 200) {
        toast.success("Password reset successful, check your email", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        navigate('/login');
      }
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error('Failed to reset password', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
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
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
        >
          Reset Password
        </button>
      </div>
      <p className='cursor-pointer hover:underline hover:underline-offset-2' onClick={() => { navigate("/login") }}>Have password? LOGIN</p>
    </div>
  );
};

export default ResetPassword;
