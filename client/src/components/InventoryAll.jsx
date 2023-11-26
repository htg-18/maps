import React, { useState, useEffect } from 'react';
import SearchDiv from './SearchDiv';
import SearchBar from './SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaSearch} from 'react-icons/fa'

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [result,setResult]=useState([]);
  const [input,setInput] = useState('');

  useEffect(() => {
    // Fetch inventory data when the component mounts
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:5000/allinventoryitems',{
        method:'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //    },
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
    }
  };
  const handleChange = (value) => {
    setInput(value);
    
  };
  console.log(inventory.filter((item) => {
    return item.itemName.toLowerCase().includes(input.toLowerCase());
  }));
  
  return (
    <div>

     <div className='bg-white flex items-center justify-center w-full max-w-md rounded-[12px] p-2 m-auto'>
    <FaSearch style={{ color: 'teal' ,fontSize:20}} />
    <input 
    className='pl-2 outline-none border-none text-center w-[100%]' 
    placeholder='Type to Search...'
    value={input}
    onChange={(e)=>handleChange(e.target.value)}
    />
    </div>

    <div className="p-20 w-screen min-h-screen container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Inventory List</h1>
      <div className="grid grid-cols-3 gap-4">
        {inventory.filter((items) => {
    return items.itemName.toLowerCase().includes(input.toLowerCase());
  }).map((item) => (
          <div key={item._id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-2">{item.itemName}</h2>
            <p className="text-gray-600 mb-2">Item ID: {item.itemId.slice(0,8)}</p>
            <p className="text-gray-600">Quantity: {item.itemQuantity}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default InventoryList;

