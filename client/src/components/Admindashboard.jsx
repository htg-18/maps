import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InventoryList from './InventoryAll';
import Navbar from './Navbar';
import Footer from './Footer';

const Admindashboard = () => {
  const navigate = useNavigate();
 
  return (
    <div className='bg-zinc-300 min-h-screen flex flex-col items-center'>
    <Navbar/>
    <div className="">
       <button className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 rounded"
           onClick={() => navigate('/adminrequest')}>
             Send request to management
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
