import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URI } from "../../url.config"
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false); // State to control Confetti rendering
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URI}/auth/verify-email?token=${token}`)
        .then((response) => {
          localStorage.setItem("token", token);
          setMessage(response?.data?.msg);
          setUserInfo({ name: response?.data?.name, email: response?.data?.email });
          if (response?.data?.msg === "Email verified successfully") {
            setShowConfetti(true); // Show Confetti when email is verified
          }
        })
        .catch((error) => {
          console.log(error)
          setMessage("Email verification failed.");
        });
    }
  }, [token]);

  useEffect(() => {
    // Stop rendering Confetti after 5 seconds
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      setTimeout(() => {
        navigate("/login");
      }, 6000)
      
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {message === "Email verified successfully" ? (
          <>
            {showConfetti && <Confetti width={width} height={height} />}
            <h1 className="text-2xl font-bold mb-4 text-green-600">{message}</h1>
            {userInfo.name && (
              <div className="mt-4">
                <p className="text-lg font-semibold">Name: <span className="text-gray-700">{userInfo.name}</span></p>
                <p className="text-lg font-semibold">Email: <span className="text-gray-700">{userInfo.email}</span></p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4">
            <p className="text-lg font-semibold text-red-600">Email verification failed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
