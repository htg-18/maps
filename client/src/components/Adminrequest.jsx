import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Adminrequest = () => {
  const [inventoryItem, setInventoryItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted inventory item:', {
      inventoryItem,
      quantity,
      description,
    });
  };

  return (
    <div className="h-screen bg-rose-300 flex flex-col justify-center ">
        <h1 className='text-center text-[40px] text-rose-950 m-10'>Send request to management</h1>
    <div className="container p-4 mx-auto w-full max-w-md bg-rose-300">
      <h1 className="text-xl font-bold ">Inventory Form</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Inventory Item:</label>
          <select className="w-full bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  " 
               value={inventoryItem} 
               required
               onChange={(event) => setInventoryItem(event.target.value)}>
                
            <option value="">Select Item</option>
            <option value="chair">Chair</option>
            <option value="table">Table</option>
            <option value="rope">Rope</option>
            <option value="pen">Pen</option>
            <option value="pencil">Pencil</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
          <input type="number" className="w-full bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " 
              value={quantity} 
              required
              onChange={(event) => setQuantity(event.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea className="w-full bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " 
             rows={3} value={description} 
             onChange={(event) => setDescription(event.target.value)} />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5">Submit</button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(-1)}>
              Go Back
      </button>
      </form>
      
    </div>
    </div>
  );
};

export default Adminrequest;



// import React, { useState } from 'react';

// const Adminrequest = () => {
//   const [formData, setFormData] = useState({
//     item: '',
//     quantity: '',
//     description: '',
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your logic to handle form submission
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
//             Inventory Item
//           </label>
//           <select
//             name="item"
//             id="item"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             onChange={handleInputChange}
//             value={formData.item}
//             required
//           >
//             <option value="">Select an item</option>
//             <option value="chair">Chair</option>
//             <option value="table">Table</option>
//             <option value="rope">Rope</option>
//             <option value="pen">Pen</option>
//             <option value="pencil">Pencil</option>
//             {/* Add more items as needed */}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
//             Quantity
//           </label>
//           <input
//             type="number"
//             name="quantity"
//             id="quantity"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter quantity"
//             onChange={handleInputChange}
//             value={formData.quantity}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             name="description"
//             id="description"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter description"
//             onChange={handleInputChange}
//             value={formData.description}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Adminrequest;
