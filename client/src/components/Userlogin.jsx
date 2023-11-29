import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import Navbar from './Navbar'; // Import your Navbar component

const UserLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/userlogin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: credentials.username, password: credentials.password })
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      toast.success('Logged In! Redirecting...', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      
      localStorage.setItem('token',json.authtoken);
      setTimeout(() => {
        navigate("/userdashboard");
       }, 2000);
    } else {
      toast.error('Invalid User Credentials', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  return (
    <div className={`flex ${windowWidth < 1200 ? 'flex-col' : 'flex-row'} min-h-screen items-center justify-center bg-zinc-300`}>
      {windowWidth >= 1200 ? (
        <div className="flex-1 bg-teal-900 h-screen flex items-center justify-center" style={{ transform: 'skewX(-10deg)', transformOrigin: 'top' }}>
          <div className="flex flex-col items-center justify-center" style={{ cursor: 'pointer' }}>
            <img src={logo} className="w-4/2 sm:w-4/3 md:w-4/4 lg:w-4/5 mb-16" alt="Logo" />
            <h1 className="text-3xl" style={{ color: 'white',fontFamily: 'Poppins, sans-serif' }}>
              Inventory Management
            </h1>
          </div>
        </div>
      ) : (
        <Navbar />
      )}
      <div className="flex items-center justify-center flex-1 flex-col h-screen bg-zinc-300" style={{fontFamily: 'Figtree, sans-serif'}}>
        <h1 className="text-3xl font-bold p-10 text-teal-900" style={{ cursor: 'pointer' }}>
          User Login
        </h1>
        <form onSubmit={handleSubmit}  className={`${
            windowWidth < 1200 ? 'w-full' : 'w-[70%]'
          } h-[40%] bg-white shadow-md rounded-[10px] px-8 pt-6 pb-8 mb-4 flex flex-col justify-evenly`}>
          <label className="flex items-center  text-gray-700 text-m font-bold mb-2">
            <FaUser className="mr-2" />
            Username:
          </label>
          <input
            type="text"
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={onChange}
            required
          />
          <label className=" flex items-center text-gray-700 text-m font-bold mb-2 mt-4">
            <RiLockPasswordFill className="mr-2" />
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={onChange}
            required
          />
          <div className="flex items-center justify-around">
            <button
              type="submit"
              className="w-[35%] bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Login
            </button>
            <button
              className="w-[35%] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;

