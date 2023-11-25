import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials,setCredentials]= useState({username:"",password:""}); 
  let navigate= useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/adminlogin",{
      method:'POST',
      headers:{
          'Content-Type':'application/json',
     },
     body:JSON.stringify({username:credentials.username,password:credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.message === 'Login successful'){
        //save the auth token and redirect
      //  localStorage.setItem('token',json.authtoken);
        navigate("/admindashboard");
        // props.showAlert('Login Successful',"success");
   } else {
      alert('Invalid username or password');
    }
  };

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
}

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-rose-300">
      <h1 className="text-3xl font-bold">Admin Login</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
        <input
          type="text"
          name="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          placeholder="Enter your username"
          value={credentials.username}
           onChange={onChange} 
          required
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">Password:</label>
        <input
          type="password"
          name="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          placeholder="Enter your password"
          value={credentials.password}
           onChange={onChange} 
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Login
        </button>
      </form>

      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>
        Go Back
      </button>
    </div>
  );
};

export default AdminLogin;
