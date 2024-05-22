import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { AiOutlineLoading } from "react-icons/ai";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
      } else {
        alert('Failed to fetch user data');
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {userData ? (
        <div className="bg-white p-8 rounded shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Welcome, {userData.name}</h2>
          <QRCode value={JSON.stringify(userData)} />
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
        <div className='flex space-x-4 justify-between '> <AiOutlineLoading className='animate-spin h-5 w-5 mr-3' /> Loading...</div>
      )}
    </div>
  );
};

export default Home;
