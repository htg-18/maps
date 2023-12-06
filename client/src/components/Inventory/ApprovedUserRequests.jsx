import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import notFound from "../../assets/not-found-404error.gif";
import { CircularProgress, Stack } from "@mui/material";
import MySkeleton from '../MySkeleton';

const ApprovedUserRequests = () => {
  const [inventory, setInventory] = useState([]);
  const [result, setResult] = useState([]);
  const [input, setInput] = useState('');
  const [showNoItems, setShowNoItems] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch inventory data when the component mounts
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/approvedrequestsuser`, {
        method: 'GET',
        headers:{
            'auth-token':localStorage.getItem('token')
        },
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
    // Check if there are no filtered items
    const filteredItems = inventory.filter((items) =>
      items.itemName.toLowerCase().includes(input.toLowerCase())
    );

    // Set the flag to true if there are no filtered items
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

      <div className=" w-screen min-h-screen container mx-auto mt-8 ">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">My Inventory List</h1>
        {loading && <MySkeleton/>}
        {!loading && showNoItems && (
          // Display the GIF when there are no filtered items
          <img src={notFound} alt="No items found" className='m-auto p-auto h-[300px] w-[300px] rounded-[10px]'/>
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
                <div key={item._id} className="w-[350px] h-[180px] bg-white hover:bg-zinc-200 cursor-pointer p-4 shadow-md rounded-md ">
                  <h2 className="text-lg font-semibold mb-2">{item.itemName}</h2>
                  <p className="text-gray-600 mb-2">Item ID: {item.itemId.slice(0, 8)}</p>
                  <p className="text-gray-600">Quantity: {item.itemQuantity}</p>
                </div>
              ))}
          </Stack>
        )}
      </div>
    </div>
  );
};

export default ApprovedUserRequests;


// export default ApprovedUserRequests
