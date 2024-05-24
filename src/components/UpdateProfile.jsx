import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URI } from '../../url.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    contact: '',
    address: '',
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_URI}/user/profile`, {
          headers: { 'auth': token },
        });

        if (response.data.user) {
          setUserData(response.data.user);
        } else {
          toast.error('Failed to fetch user data', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error('Failed to fetch user data', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('contact', userData.contact);
      formData.append('address', userData.address);
      if (userData.profileImage) {
        formData.append('profileImage', userData.profileImage);
      }

      const response = await axios.post(`${API_URI}/user/update-profile`, formData, {
        headers: {
          'auth': token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Profile updated successfully', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/profile');
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error('Failed to update profile', {
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Update Profile</h2>
        <div className='flex justify-center'>
        <img src={userData.profileImage || ''} alt={userData.profileImage || ''}  className='h-36 w-36'/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={userData.name || ''}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={userData.contact || ''}
            onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={userData.address || ''}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Image</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setUserData({ ...userData, profileImage: e.target.files[0] })}
          />
        </div>
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
