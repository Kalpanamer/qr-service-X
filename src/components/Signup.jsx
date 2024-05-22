import React, { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
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
    const response = await fetch("https://newupdate-vcdv.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(
        "Signup successful, please check your email for verification link",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      toast.error("Signup failed, please try again", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
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
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
