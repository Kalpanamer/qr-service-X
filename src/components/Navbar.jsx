import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">MyApp</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    { token ? (<> 
                    <Link to="/" className="text-white text-2xl hover:text-gray-400">Home</Link>
                    <Link to="/profile" className="text-white text-2xl hover:text-gray-400">Profile</Link>
                    </>):(<Link to="/login" className="text-white text-2xl hover:text-gray-400">Login</Link>)}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    {token ? (<>
          <Link to="/" className="block text-white py-2 px-4" onClick={toggleMenu}>Home</Link>
          <Link to="/profile" className="block text-white py-2 px-4" onClick={toggleMenu}>Profile</Link>
          </>
                    ) : (<Link to="/login" className="block text-white py-2 px-4" onClick={toggleMenu}>Login</Link>)}
                    
                    <button
                        onClick={() => {
                            handleLogout();
                            toggleMenu();
                        }}
                        className="block w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2 text-left"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
