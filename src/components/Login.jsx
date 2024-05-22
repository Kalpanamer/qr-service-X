import React, { useState } from 'react';
import axios from 'axios';
import { API_URI } from "../../url.config"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URI}/login`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Login Successful');
        window.location.href = '/home';
      } else {
        alert('Login failed, please try again');
      }
    } catch (error) {
      alert('Login failed, please try again');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Log In</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          name="email"
          placeholder="Enter your email..."
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={formData.password}
          onChange={handleChange}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
