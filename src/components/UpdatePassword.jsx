import React, { useState } from 'react';
import axios from 'axios';
import { API_URI } from '../../url.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {

  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URI}/user/update-password`, { oldPassword, newPassword }, {
        headers: { 'auth': token },
      });

      if (response.status === 200) {
        toast.success('Password updated successfully', {
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
      navigate("/")
    } catch (error) {
      console.error("Error updating password", error);
      toast.error('Failed to update password', {
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
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Update Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Old Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleUpdatePassword}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
