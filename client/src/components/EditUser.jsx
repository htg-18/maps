import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const EditUser = ({ setModalVisible, user }) => {
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
    let trimmedValue = value.trim(); // Trim whitespace from both ends

    // Check if the value is a valid phone number
    const regex = /^\d{10}$/;
    const isValidPhoneNo = regex.test(trimmedValue);

    // Update the user data with the trimmed value
    setUserData({ ...userData, [name]: trimmedValue });

    // Set the error message if the phone number is invalid
    if (name === 'phoneNo' && !isValidPhoneNo) {
      setError('Phone number must be a 10-digit number!');
    } else if (name === 'phoneNo' && isValidPhoneNo) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalVisible(false);
    // rest of your code...
  };

  return (
    <div className="h-screen bg-white font-bold flex flex-col justify-center ">
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

          {/* {error && (
            <div className="mb-4 text-red-500 text-sm font-bold">{error}</div>
          )} */}

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
