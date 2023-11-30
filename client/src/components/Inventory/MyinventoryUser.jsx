import React, { useContext, useEffect, useRef, useState } from 'react'
import ApprovedUserRequests from './ApprovedUserRequests'
import InventoryList from '../InventoryAll'
import { ShopContext } from '../context/shop-context';
import { Badge } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const MyinventoryUser = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const { cartItems, addToCart, removeFromCart, deleteFromCart, findTotal,findUnique } = useContext(ShopContext);
  const [cart,setCart]=useState(findUnique())
  const navigate = useNavigate();

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
    <div className='bg-zinc-300 flex flex-col items-center'>
     <div className='flex items-center gap-5 w-full justify-center'>
        <h1 className='font-bold text-teal-900 text-[40px] m-6 ' style={{ fontFamily: 'Roboto, sans-serif' }}>Inventory</h1>
        <div className='m-6  h-12 w-12 mt-3 bg-teal-600 hover:bg-teal-800 flex items-center justify-center rounded-[50%]'>
          <Badge max={9}
            badgeContent={cart}
            color="error">
            <FaShoppingCart className='text-white text-3xl '
              onClick={toggleSidebar}
            />
          </Badge>
        </div>
      </div>
      <button onClick={()=>{navigate(-1)}} className=' bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded mt-4 mb-6'>
        User Dashboard
      </button>
      <div ref={sidebarRef}>
          <InventoryList showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
        </div>
  )
}

export default MyinventoryUser
