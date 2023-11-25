import React, { useState, useEffect } from 'react';
import SearchDiv from './SearchDiv';
import SearchBar from './SearchBar';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [result,setResult]=useState([]);


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
      } else {
        console.error('Failed to fetch inventory:', data.message);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error.message);
    }
  };
   
  return (
    <>
      <div>
          <div className='mx-auto my-auto flex-col items-center'>
              <SearchBar setResult={setResult} inventory/>
              < SearchDiv result={result}/>
          </div>
        </div>

    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Inventory List</h1>
      <div className="grid grid-cols-3 gap-4">
        {inventory.map((item) => (
          <div key={item._id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-2">{item.itemName}</h2>
            <p className="text-gray-600 mb-2">Item ID: {item.itemId}</p>
            <p className="text-gray-600">Quantity: {item.itemQuantity}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default InventoryList;
