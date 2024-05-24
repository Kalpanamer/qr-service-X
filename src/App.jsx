import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from './components/VerifyEmail';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import UpdatePassword from './components/UpdatePassword';
import Navbar from './components/Navbar';
import UpdateProfile from './components/UpdateProfile';
import NotFound from './components/NotFound';

const App = () => {


  return (
    <div>
      <div className='sticky top-0'>
      <Navbar />
      </div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/frgt-pass" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
