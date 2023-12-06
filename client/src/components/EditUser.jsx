import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaPhone } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";

const EditUser = ({ setModalVisible, user, setRefresh }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: user.username,
    password: '',
    email: user.email,
    phoneNo: user.phoneNo,
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let trimmedValue = value.trim(); 

    const regex = /^\d{10}$/;
    const isValidPhoneNo = regex.test(trimmedValue);

    setUserData({ ...userData, [name]: trimmedValue });

    if (name === 'phoneNo' && !isValidPhoneNo) {
      setError('Phone number must be a 10-digit');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    console.log()
    e.preventDefault();
    setModalVisible(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/edituser/${user.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        const username = userData.username;
        setModalVisible(false);
        toast.success(`Successfully Updated ${username}!`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
        setRefresh(true);
        setUserData({
          username: '',
          password: '',
          email: '',
          phoneNo: '',
        });
      } else {
        setError(data.error || 'Error updating user');
        toast.error(error, {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      setError('Error updating user');
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <div className="bg-white font-bold flex flex-col justify-center ">
      <h1 className="text-center text-[40px] text-teal-800 m-1">Edit User</h1>

      <div className="bg-white mx-auto w-full  font-semibold max-w-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="flex items-center  text-gray-700 text-sm font-bold mb-2">
              <FaUser className='mr-2' />
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="flex items-center  text-gray-700 text-sm font-bold mb-2">
              <MdEmail className='mr-2 text-lg'/>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNo" className="flex items-center  text-gray-700 text-sm font-bold mb-2">
              <FaPhone className='mr-2'/>
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={userData.phoneNo}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm font-bold">{error}</div>
          )}

          <div className="text-center flex justify-around">
            <button
              type="submit"
              className="mt-4 w-[70%] bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
            >
              Edit User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;