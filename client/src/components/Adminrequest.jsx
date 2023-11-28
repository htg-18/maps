


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataitems } from '../../inventoryItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import { BiSolidFactory } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { MdDescription } from "react-icons/md";

const Adminrequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    description: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('')
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'quantity') {
      // Validate quantity to ensure it's a positive integer
      const isValidQuantity = /^[1-9]\d*$/.test(value);

      if (!isValidQuantity) {
        setValidationError('Enter a valid quantity');
      } else {
        setValidationError('');
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationError) {
      toast.error(validationError, { theme: 'light' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/additemsbymangement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemName: formData.item,
          itemQuantity: formData.quantity,
          description: formData.description,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log(data.success);
        toast.success('Success! Management will be notified', { theme: 'light' });
        setFormData({
          item: '',
          quantity: '',
          description: '',
        })
      } else {
        toast.error('Error! Not able to process the request', { theme: 'light' });
      }
    } catch (error) {
      toast.error('Error! Not able to process the request', { theme: 'light' });
    }
  };

  useEffect(() => {
    // Clear the form data and toast message when the component is unmounted
    return () => {
      setFormData({
        item: '',
        quantity: '',
        description: '',
      });
      setFormSubmitted(false);
      setValidationError('');
      toast.dismiss(); // Clear all toasts
    };
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  return (
    <div className=' '>
      {/* <Navbar/> */}
      <div className="h-screen  bg-zinc-300 flex flex-col  w-[100%]">
        <h1 className='text-center text-[40px] font-bold text-teal-800 m-1'>Send request to management</h1>

        <div className="max-w-md mx-auto mt-8 w-[100%] flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="w-[80%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="flex items-center  text-gray-700 text-sm font-bold mb-2" htmlFor="item">
              <BiSolidFactory style={{paddingRight:5,fontSize:20}}/>
                Inventory Item
              </label>
              <select
                name="item"
                id="item"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={formData.item}
                required
              >
                <option value="">Select an item</option>
                {dataitems.map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="flex items-center  text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                <FaCartPlus style={{paddingRight:6,fontSize:20}}/>
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter quantity"
                onChange={handleInputChange}
                value={formData.quantity}
                required
              />
              {validationError && (
                <p className="text-red-500 text-xs italic">{validationError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="flex items-center  text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                <MdDescription style={{paddingRight:6,fontSize:20}}/>
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus
                :shadow-outline h-20"
                placeholder="Enter description"
                onChange={handleInputChange}
                value={formData.description}
              />
            </div>
            <div className="flex items-center justify-around">
              <button
                type="submit"
                className="w-[35%] bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                className="w-[35%] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  navigate('/admindashboard');
                }}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminrequest;


