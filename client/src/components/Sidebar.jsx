import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from './context/shop-context';
import { FaShoppingCart, FaExclamation } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const { cartItems,setCartItems, addToCart, removeFromCart, deleteFromCart, findTotal } = useContext(ShopContext);
  const [inventory, setInventory] = useState([]);
  const [empty, setEmpty] = useState(findTotal());
  
  const handleCartSubmitAdmin = async()=>{
    console.log(cartItems);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/additemsbymanagementcart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItems)
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log(data.success);
        toast.success('Success! Management will be notified', { theme: 'light' });
        // Clear the cart items after successful order submission
        setCartItems({});
      } else {
        console.log(error);
        toast.error('Error! Not able to process the request', { theme: 'light' });
      }
    } catch (error) {
      console.log(error);
      toast.error('Error! Not able to process the request', { theme: 'light' });
    }
  }
  
  
 const handleCartSubmitUser = async()=>{
    console.log(cartItems);
      // console.log("user case");
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/additemsbyusercart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(cartItems)
      });
  
      // const data = await response.json();
      const data =  await response.json();
  
      if (data.success) {
        console.log(data.success);
        toast.success('Request sent to admin', { theme: 'light' });
        // Clear the cart items after successful order submission
        setCartItems({});
      } else {
        console.log(error);
        toast.error('Error! Not able to process the request', { theme: 'light' });
      }
    } catch (error) {
      console.log(error);
      toast.error('Error! Not able to process the request', { theme: 'light' });
    }
 }


  
  useEffect(() => {
    // Fetch inventory data when the component mounts
    fetchInventory();
  }, [setCartItems]);

  useEffect(() => {
    setEmpty(findTotal());
  }, [findTotal()]);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/allinventoryitems`, {
        method: 'GET',
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
    <div className="">
      <div
        className='border p-3 flex flex-col items-center justify-start pb-10 bg-zinc-100 overflow-y-scroll max-h-screen min-h-screen w-[70%] md:w-[40%] fixed right-0 top-0'
        style={{ zIndex: 200 }}
      >
        <div className='flex gap-4 items-center justify-center w-full h-full bg-zinc-300 p-4 rounded-[10px] '>
          <h1 className='font-bold text-2xl mt-2'>Your Cart</h1>
          <div className='h-12 w-12 mt-3 bg-teal-600 flex items-center justify-center rounded-[50%]'>
            <FaShoppingCart className='text-white text-3xl' />
          </div>
        </div>
        <hr className='border border-zinc-300 w-full mt-5 mb-5' />
        {empty === 0 ? (
          <div className='m-auto'>
            <div className='h-36 w-36 rounded-full bg-red-400 flex items-center justify-center m-auto'>
              <FaExclamation className='text-[100px] text-white' />
            </div>
            <p className='text-xl text-zinc-500 pt-5'>Your cart is currently empty</p>
          </div>
        ) : (
          <>
            {Object.keys(cartItems).map((itemId) => {
              const cartItem = inventory.find((item) => item._id === itemId);

              // Check if the item exists in the cart and has a quantity greater than 0
              if (cartItem && cartItems[cartItem._id] > 0) {
                return (
                  <div key={cartItem._id} className="flex flex-col items-center w-[250px] h-[280px] sm:w-[350px] sm:h-[300px] bg-zinc-200 m-3  cursor-pointer p-4 rounded-md shadow-xl">
                    <h2 className="text-lg font-semibold mb-2">{cartItem.itemName}</h2>
                    <p className="text-gray-600 mb-2">Item ID: {cartItem.itemId.slice(0, 8)}</p>
                    <p className="text-gray-600">Quantity: {cartItem.itemQuantity}</p>

                    {/* Other details from cartItem */}
                    {cartItems[cartItem._id] === 0 || cartItems[cartItem._id] === undefined ? (
                      <button
                        className='w-[50%] bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded mt-4 '
                        onClick={() => {
                          addToCart(cartItem._id);
                        }}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <>
                        <div className='flex flex-col items-center justify-center mt-8'>
                          <div className='flex'>
                            <button
                              className='font-bold text-xl bg-gray-400 hover:bg-gray-600 text-white pl-3 pr-3 pt-1 pb-1 ml-2 mr-2'
                              onClick={() => {
                                removeFromCart(cartItem._id);
                              }}
                            >
                              -
                            </button>

                            <p>
                              <b className='font-extra-bold text-xl'>{`${cartItems[cartItem._id]}`}</b> in Cart
                            </p>

                            <button
                              className='font-bold text-xl bg-gray-400 text-white hover:bg-gray-600 pl-3 pr-3 pt-1 pb-1 ml-2 mr-2'
                              onClick={() => {
                                addToCart(cartItem._id);
                              }}
                            >
                              +
                            </button>
                          </div>
                          <div>
                            <button
                              className="w-[100%] bg-[#D83F31] hover:bg-[#CD1818] text-white font-bold py-2 px-4 rounded mt-4"
                              onClick={() => {
                                deleteFromCart(cartItem._id);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              }
            })}
            {/* "Order" button */}
            <button
              className="w-[50%] bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded mt-4"
               onClick={localStorage.getItem('admintoken')!==null ? handleCartSubmitAdmin : handleCartSubmitUser}
              // Add functionality to handle the order button click
                // For example, you can redirect to the checkout page
               
            >
              Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
