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
    profileImage: '',
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Profile</h2>
        <div className='flex justify-center'>
          <img src={userData.profileImage || ''} alt="Profile" className='h-36 w-36'/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <p>{userData.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact</label>
          <p>{userData.contact}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <p>{userData.address}</p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/update-profile" className="text-blue-500 hover:underline">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
