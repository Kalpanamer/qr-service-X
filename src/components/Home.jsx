import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URI } from '../../url.config';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_URI}/user/user`, {
          headers: { 'auth': token },
        });

        if (response.msg === "Token is not valid") {
          // Suggested code may be subject to a license. Learn more: ~LicenseLog:3800605140.
          // Suggested code may be subject to a license. Learn more: ~LicenseLog:1236623775.
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (response.data.user) {
          setUserData(response.data.user);
        } else {
          alert('Failed to fetch user data');
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (userData) {
    if (!userData) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className='flex space-x-4 justify-between'>
          <AiOutlineLoading className='animate-spin h-5 w-5 mr-3' /> Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {userData ? (
        <div className="bg-white p-8 rounded shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Welcome, {userData.name}</h2>
          <QRCode value={JSON.stringify(userData)} size={256} level={"H"} />
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Available Services</h3>
            <ul className="list-disc list-inside">
              <li>Electrician</li>
              <li>Mechanic</li>
              <li>Plumber</li>
              {/* Add more services as needed */}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <p>Failed to load user data. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default Home;