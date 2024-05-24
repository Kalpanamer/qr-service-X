import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { API_URI } from "../../url.config";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toast.success("You are already logged in", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required", {
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
      const response = await axios.post(`${API_URI}/auth/login`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success("Login successful", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        navigate("/");
      } else {
        toast.error("Login failed, please try again", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error('Login failed, please try again', {
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
      <div className='flex justify-between space-x-9 items-center'>
        <p className='cursor-pointer hover:underline hover:underline-offset-2' onClick={() => { navigate("/frgt-pass") }}>Forgot Password</p>
        <p className='cursor-pointer hover:underline hover:underline-offset-2' onClick={() => { navigate("/signup") }}>Don't have an account? SIGN UP</p>
      </div>
    </div>
  );
};

export default Login;
