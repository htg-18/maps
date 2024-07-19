import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.png';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import Navbar from '../NavbarFooter/Navbar';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admintoken') !== null;
    if(isAuthenticated){
      navigate("/admin/map")
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/adminlogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      toast.success('Logged In! Redirecting...', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
      });
      localStorage.setItem('admintoken',json.authtoken);
      setTimeout(() => {
        navigate('/admin/map');
      }, 1000);
    } else {
      toast.error('Invalid Admin Credentials', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className={`flex ${windowWidth < 1200 ? 'flex-col' : 'flex-row'} min-h-screen items-center justify-center bg-zinc-300`}>
      {windowWidth >= 1200 ? (
         
            <div className="flex-1 bg-[#2c2c2c]  h-screen flex items-center justify-center" style={{ transform: 'skewX(-10deg)', transformOrigin: 'top' }}>
              <div className="flex flex-col items-center justify-center" style={{ cursor: 'pointer' }}>
                <h1 className="text-5xl font-bold" style={{ color: 'white',fontFamily: 'Poppins, sans-serif' }}>
                StoreMap

                </h1>
              </div>
            </div>
          
      ) : (
        <Navbar />
      )}
      <div className="flex items-center justify-center flex-1 flex-col h-screen bg-zinc-300" style={{fontFamily: 'Figtree, sans-serif'}}>
        <h1 className="text-4xl  p-10 text-orange-700" style={{ userSelect: "none",fontFamily: 'Figtree, sans-serif'  }}>
          Admin Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className={`${
            windowWidth < 1200 ? 'w-full' : 'w-[65%]'
          } h-[45%] bg-white shadow-md rounded-[10px] px-8 pt-8 pb-8 mb-4 flex flex-col justify-evenly`}
        >
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
          <label className=" text-gray-700 text-m font-bold mb-2 mt-4 flex items-center">
          <RiLockPasswordFill className="mr-2"/>
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
          <div className='flex items-center justify-around pt-5'>
            <button type="submit" className="w-[35%] bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4">
              Login
            </button>
            <button className="w-[35%] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => navigate('/')}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


