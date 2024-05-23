import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URI } from '../../url.config';
import { toast } from 'react-toastify';

const Profile = () => {
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

      const response = await axios.post(`${API_URI}/update-profile`, formData, {
        headers: {
          'auth': token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Profile</h2>
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
      <div className="mt-4 text-center">
        <Link to="/update-password" className="text-blue-500 hover:underline">
          Update Password
        </Link>
      </div>
    </div>
  );
};

export default Profile;
