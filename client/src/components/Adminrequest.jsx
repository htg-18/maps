import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Adminrequest = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            item: '',
            quantity: '',
            description: '',
          });
        
          const handleInputChange = (e) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
          };
        
          const handleSubmit = async(e) => {
            e.preventDefault();
            // Add your logic to handle form submission
            console.log('Form submitted:', formData);

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
                    console.log('Item added successfully');
                    // Add any further logic or redirection after successful submission
                } else {
                    console.error('Error adding item');
                    // Handle error if needed
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error if needed
            }
          };
        
  return (
    <>
    <div className="h-screen bg-rose-300 flex flex-col justify-center ">
        <h1 className='text-center text-[40px] text-rose-950 m-10'>Send request to management</h1>
    
        <div className="max-w-md mx-auto mt-8">
           <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
           <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
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
            <option value="chair">Chair</option>
            <option value="table">Table</option>
            <option value="rope">Rope</option>
            <option value="pen">Pen</option>
            <option value="pencil">Pencil</option>
            {/* Add more items as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
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
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            onChange={handleInputChange}
            value={formData.description}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(-1)}>
              Go Back
      </button>
        </div>
      </form>
    </div>

    </div> 
    </>
  );
};

export default Adminrequest;


