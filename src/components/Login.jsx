import React, { useState } from 'react';

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
    const response = await fetch('https://newupdate-vcdv.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      window.location.href = '/home';
    } else {
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
