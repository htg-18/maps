import React, { useState, useEffect, useContext, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import notFound from "../assets/not-found-404error.gif";
import { Badge, CircularProgress, Stack } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import Sidebar from './Sidebar.jsx';
import { ShopContext } from './context/shop-context.jsx';

const InventoryList = ({showSidebar,setShowSidebar}) => {
  const [inventory, setInventory] = useState([]);
  const [result, setResult] = useState([]);
  const [input, setInput] = useState('');
  const [showNoItems, setShowNoItems] = useState(false);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, removeFromCart, deleteFromCart, findTotal } = useContext(ShopContext);
  const sidebarRef = useRef(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:5000/allinventoryitems', {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setInventory(data.data);
        setResult(data.data);
      } else {
        console.error('Failed to fetch inventory:', data.message);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  useEffect(() => {
    const filteredItems = inventory.filter((items) =>
      items.itemName.toLowerCase().includes(input.toLowerCase())
    );
    setShowNoItems(filteredItems.length === 0);
  }, [inventory, input]);

  return (
    <div>
      <div className='bg-white flex items-center justify-center w-full max-w-md rounded-[12px] p-2 m-auto'>
        <FaSearch style={{ color: 'teal', fontSize: 20 }} />
        <input
          className='pl-2 outline-none border-none text-center w-[100%]'
          placeholder='Type to Search...'
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <div className="w-screen min-h-screen container mx-auto mt-8 ">
        <h1 className="text-2xl font-bold mb-4 text-center">Inventory List</h1>

        {loading && <CircularProgress />}
        {!loading && showNoItems && (
          <img src={notFound} alt="No items found" className='m-auto p-auto h-[300px] w-[300px] rounded-[10px]' />
        )}
        {!loading && !showNoItems && (
          <Stack spacing={{ xs: 1, sm: 2, md: 4 }}
            direction={{ xs: 'column', sm: 'row' }}
            useFlexGap flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            paddingBottom={4}
            paddingTop={3}
          >
            {inventory
              .filter((item) => item.itemName.toLowerCase().includes(input.toLowerCase()))
              .map((item) => (
                <div key={item._id} className="flex flex-col items-center w-[350px] h-[300px] bg-white hover:bg-zinc-200 cursor-pointer p-4 shadow-md rounded-md ">
                  <h2 className="text-lg font-semibold mb-2">{item.itemName}</h2>
                  <p className="text-gray-600 mb-2">Item ID: {item.itemId.slice(0, 8)}</p>
                  <p className="text-gray-600">Quantity: {item.itemQuantity}</p>
                  {/* <img src={item.itemName} alt="noimage"></img> */}
                  {cartItems[item._id] == 0 || cartItems[item._id] === undefined ? (
                    <button className='w-[50%] bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded mt-4 '
                      onClick={() => {
                        addToCart(item._id);
                      }}
                    >
                  Add to cart
                  </button>
                  ) : (
                    <div className='flex flex-col items-center justify-center mt-8'>
                      <div className='flex'>
                        <button
                          className='font-bold text-xl bg-gray-400 hover:bg-gray-600 text-white pl-3 pr-3 pt-1 pb-1 ml-2 mr-2'
                          onClick={() => {
                            removeFromCart(item._id);
                          }}
                        >
                          -
                        </button>

                        <p>
                          <b className='font-extra-bold text-xl'>{`${cartItems[item._id]}`}</b> in Cart
                        </p>

                        <button
                          className='font-bold text-xl bg-gray-400 text-white hover:bg-gray-600 pl-3 pr-3 pt-1 pb-1 ml-2 mr-2'
                          onClick={() => {
                            addToCart(item._id);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <button
                          className="w-[100%] bg-[#D83F31] hover:bg-[#CD1818] text-white font-bold py-2 px-4 rounded mt-4"
                          onClick={() => {
                            deleteFromCart(item._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </Stack>
        )}
      </div>

      {showSidebar && (
        <div className="" ref={sidebarRef}>
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default InventoryList;
