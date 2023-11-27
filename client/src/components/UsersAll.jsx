import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBullseye, FaSearch } from 'react-icons/fa';
import notFound from '../assets/not-found-404error.gif';
import { MdEdit } from "react-icons/md";
import Modal from './Modal';

const UsersAll = () => {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState([]);
  const [input, setInput] = useState('');
  const [showNoItems, setShowNoItems] = useState(false);
  const [modalVisible,setModalVisible]=useState(false)

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUsers();
  }, []);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalVisible && e.target.classList.contains('modal-wrapper')) {
        setModalVisible(false);
      }
    };

    if (modalVisible) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [modalVisible]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/getallusers', {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
        setResult(data.data);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  useEffect(() => {
    // Check if there are no filtered items
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(input.toLowerCase())
    );

    // Set the flag to true if there are no filtered items
    setShowNoItems(filteredUsers.length === 0);
  }, [users, input]);

  return (
    <div>
      <div className="bg-white flex items-center justify-center w-full max-w-md rounded-[12px] p-2 m-auto">
        <FaSearch style={{ color: 'teal', fontSize: 20 }} />
        <input
          className="pl-2 outline-none border-none text-center w-[100%]"
          placeholder="Type to Search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <div className="px-20 w-screen min-h-screen container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        {showNoItems ? (
          // Display the GIF when there are no filtered items
          <img src={notFound} alt="No items found" className="m-auto p-auto h-[300px] w-[300px] rounded-[10px]" />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {users
              .filter((user1) =>
                user1.username.toLowerCase().includes(input.toLowerCase()) 
              )
              .map((user) => (
                <div key={user._id} className="flex flex-col bg-white p-4 shadow-md rounded-md">
                <div className='flex items-center justify-between'>
                <h2 className="text-lg font-semibold mb-2">{user.username}</h2>
                  <MdEdit className='hover:text-teal-800 text-2xl' style={{fontSize:'2xl',cursor:'pointer'}}

                    onClick={()=>{
                      setModalVisible(true);
                      console.log(modalVisible)
                    }}
                  />
                 
                  </div>
                  <p className="text-gray-600 mb-2">Email: {user.email}</p>
                  <p className="text-gray-600">Phone No: {user.phoneNo}</p>
                </div>
              ))}
          </div>
        )}
      </div>
     
      {modalVisible && <Modal setModalVisible={setModalVisible}/>}
    
    </div>
  );
};

export default UsersAll;
