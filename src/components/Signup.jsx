import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URI } from "../../url.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
    email: "",
    password: "",
    name: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!formData.email || !formData.password || !formData.name || !formData.contact || !formData.address) {
      toast.error("All fields are required", {
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
      const response = await axios.post(`${API_URI}/auth/signup`, formData);
      const data = response.data;
      if (data.msg === "User registered, please verify your email") {
        toast.success("Signup successful, please check your email for verification link", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else if (data.msg === "User already exists") {
        toast.info("User already exists", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.error("Signup failed, please try again", {
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
      console.error("Signup error", error);
      toast.error("Signup failed, please try again", {
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
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign Up</h2>
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
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          name="name"
          placeholder="Enter your name..."
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          name="contact"
          placeholder="Enter your contact number..."
          value={formData.contact}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          name="address"
          placeholder="Please fill the add. according to your aadhar"
          value={formData.address}
          onChange={handleChange}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
          Sign Up
        </button>
      </form>
      <div className='flex justify-between space-x-9 items-center'>
        <p className='cursor-pointer hover:underline hover:underline-offset-2' onClick={() => { navigate("/login") }}>Have an account? LOGIN</p>
      </div>
    </div>
  );
};

export default Signup;
