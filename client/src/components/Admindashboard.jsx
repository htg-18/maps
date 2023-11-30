

import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryList from './InventoryAll';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Badge, Stack } from '@mui/material';
import { ShopContext } from './context/shop-context';

const Admindashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  
  const { cartItems, addToCart, removeFromCart, deleteFromCart, findTotal,findUnique } = useContext(ShopContext);
  const [cart,setCart]=useState(findUnique())
  useEffect(() => {
    toast.dismiss();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
     setCart(findUnique())
  }, [findUnique()]);

  return (
    <div className={`bg-zinc-300 min-h-screen flex flex-col items-center  `} >
      <div className='flex items-center gap-5 w-full justify-center'>
        <h1 className='font-bold text-teal-900 text-[40px] m-6 ' style={{ fontFamily: 'Roboto, sans-serif' }}>ADMIN DASHBOARD</h1>
        <div className='m-6  h-16 w-16 sm:h-[55px] sm:w-[55px] mt-3 bg-teal-600 hover:bg-teal-800 flex items-center justify-center rounded-[50%]'>
          <Badge max={9}
            badgeContent={cart}
            color="error">
            <FaShoppingCart className='text-white text-3xl '
              onClick={toggleSidebar}
            />
          </Badge>
        </div>
      </div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <button className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 m-4 rounded justify-center"
          onClick={() => navigate('/adminrequest')}>
          Send request to management
        </button>
        <button className="flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 m-4 rounded"
          onClick={() => navigate('/admin/users')}>
          <FaUsers className='mx-2 text-lg'  />Users
        </button>
        <button className="flex items-center bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 m-4 rounded justify-center"
          onClick={() => navigate('/userrequests')}>
          User Requests
        </button>
      </Stack>

      <div className=' flex flex-col items-center m-6' style={{ fontFamily: 'Figtree, sans-serif' }}>
        <div ref={sidebarRef}>
          <InventoryList showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Admindashboard;

