import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import InventoryList from './InventoryAll';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from "react-icons/fa";
import ApprovedUserRequests from './Inventory/ApprovedUserRequests';
import { Stack } from '@mui/material';

const Admindashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear the form data and toast message when the component is unmounted
   
      toast.dismiss(); // Clear all toasts
  }, []); // Emp
  return (
    <div className='bg-zinc-300 min-h-screen min-w-screen flex flex-col items-center justify-center'>
      <h1 className='font-bold text-teal-900 text-[40px] m-6'>USER DASHBOARD</h1>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        
      >

       <button className="w-[300px] flex items-center justify-center bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 rounded"
           onClick={() => navigate('/myinventory')}>
             All Inventory
         </button>
         <button className="w-[300px] flex items-center justify-center bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 rounded"
           onClick={() => navigate('/requestitem')}>
           <FaPlus style={{paddingRight:'4px'}}/>Request Item
         </button>
         <button className="flex items-center justify-center w-[300px]  bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 rounded"
         onClick={() => navigate('/myrequests')}>
           My Requests
         </button>
    </Stack>
     
    

       <div className=' flex flex-col items-center m-6'>
          <ApprovedUserRequests/>
   
        </div>
        {/* <Footer/> */}
 </div>
  )
}

export default Admindashboard
