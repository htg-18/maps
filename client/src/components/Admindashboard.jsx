import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import InventoryList from './InventoryAll';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from "react-icons/fa";

const Admindashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear the form data and toast message when the component is unmounted
   
      toast.dismiss(); // Clear all toasts
  }, []); // Emp
  return (
    <div className='bg-zinc-300 min-h-screen flex flex-col items-center'>
    <Navbar/>
    <div className="flex">
       <button className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 rounded"
           onClick={() => navigate('/adminrequest')}>
             Send request to management
         </button>
         <button className="flex items-center bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 rounded"
           onClick={() => navigate('/createNewUser')}>
           <FaPlus style={{paddingRight:'4px'}}/>Create New User
         </button>
         <button className="flex items-center bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 rounded">
           User Requests
         </button>
    </div>
     
    

       <div className=' flex flex-col items-center m-6'>
          <InventoryList/>
        </div>
        <Footer/>
 </div>
  )
}

export default Admindashboard
