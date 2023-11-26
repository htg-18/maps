import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

const CreateNewUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    phoneNo: '',
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
      setError('Phone number must be 10 digit Number!');
    } else if (name === 'phoneNo' && isValidPhoneNo) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/createnewuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('User created successfully!');
        const username = userData.username;
        toast.success(`Successfully added ${username}!`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });

        // Clear form fields
        setUserData({
          username: '',
          password: '',
          email: '',
          phoneNo: '',
        });

        // Redirect to a success page or reset the form
        // navigate('/success');
      } else {
        setError(data.error || 'Error creating user');
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
      setError('Error creating user');
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
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <div className="h-screen bg-zinc-300 font-bold flex flex-col justify-center ">
      <h1 className="text-center text-[40px] text-teal-800 m-1">Create New User</h1>

      <div className="bg-white mx-auto w-full font-semibold max-w-md p-8">
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

          <div className="mb-4">
            <label htmlFor="password" className="flex items-center text-gray-700 text-sm font-bold mb-2">
              <RiLockPasswordFill className='mr-2' />
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* {error && (
            <div className="mb-4 text-red-500 text-sm font-bold">{error}</div>
          )} */}

          <div className="text-center flex justify-around">
            <button
              type="submit"
              className="mt-4 w-[35%] bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
            >
              Create User
            </button>

            <button
              type="button"
              className="mt-4 w-[35%] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                // Navigate back or perform some other action
                navigate('/admin/users');
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUser;
