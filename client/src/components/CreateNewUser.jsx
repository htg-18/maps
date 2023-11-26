import React, { useState } from 'react';

const CreateNewUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions with the form data here
    console.log('Form submitted:', userData);
  };

  return (
    <div className='bg-zinc-300 min-h-screen' style={{border:'1px solid transparent'}}>
     
      <form onSubmit={handleSubmit} className="max-w-md  mx-auto mt-8">
        <div className="mb-4">
        <h1 className='text-center font-bold text-2xl text-teal-700'>Create New User</h1>
          <label htmlFor="username" className="w-[100%] block text-gray-700 text-sm font-bold mb-2">Username:</label>
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
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
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
        <div className="text-center flex justify-around">
          <button
            type="submit"
            className="mt-4 w-[35%] bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
          >
            Create User
          </button>
          <button
            type="submit"
            className="mt-4 w-[35%] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewUser;
