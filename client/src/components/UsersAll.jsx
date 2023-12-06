import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import notFound from '../assets/not-found-404error.gif';
import { MdEdit } from 'react-icons/md';
import Modal from './Modal';
import { CircularProgress, Stack } from "@mui/material";
import { IoTrashBin } from "react-icons/io5";
import MySkeleton from './MySkeleton';

const UsersAll = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState('');
  const [showNoItems, setShowNoItems] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [button, setButton] = useState()
  const [refresh,setRefresh]=useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUsers();
  }, []);
   useEffect(()=>{
    
    fetchUsers()
    setRefresh(false)
   },[refresh])
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
      const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/getallusers`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };
  // console.log(button)
  const handleEditClick1 = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
    setButton(1)
    
  };
  const handleEditClick2 = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
    setButton(2)
    
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
    <div className='min-h-screen min-w-screen'>
      <div className="bg-white  flex items-center justify-center w-full max-w-md rounded-[12px] p-2 m-auto">
        <FaSearch style={{ color: 'teal', fontSize: 20 }} />
        <input
          className="pl-2 outline-none border-none text-center w-[100%]"
          placeholder="Type to Search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <div className="w-screen min-h-screen container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">All Users</h1>
        {loading ? (
          <MySkeleton/>
        ) : showNoItems ? (
          // Display the GIF when there are no filtered items
          <img src={notFound} alt="No items found" className="m-auto p-auto h-[300px] w-[300px] rounded-[10px]" />
        ) : (
          <Stack spacing={{ xs: 1, sm: 2, md: 4 }}
            direction={{ xs: 'column', sm: 'row' }}
            useFlexGap flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            paddingBottom={4}
            paddingTop={3}
          >
            {users
              .filter((user1) =>
                user1.username.toLowerCase().includes(input.toLowerCase())
              )
              .map((user) => (
                <div key={user._id} className="w-[350px] h-[180px]  flex flex-col bg-white  hover:bg-zinc-200 cursor-pointer p-4 shadow-md rounded-md">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold mb-2">{user.username}</h2>
                    <div className='flex'>
                    <IoTrashBin 
                      className="hover:text-[#cd1818] text-2xl"
                      style={{ fontSize: '2xl', cursor: 'pointer',marginRight:15 }}
                      onClick={() => handleEditClick1(user)}
                    />
                    <MdEdit
                      className="hover:text-[#186f65] text-2xl"
                      style={{ fontSize: '2xl', cursor: 'pointer' }}
                      onClick={() => handleEditClick2(user)}
                    />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">Email: {user.email}</p>
                  <p className="text-gray-600">Phone No: {user.phoneNo}</p>
                </div>
              ))}
          </Stack>
        )}
      </div>
      {modalVisible && <Modal setModalVisible={setModalVisible} user={selectedUser} button={button} setRefresh={setRefresh} />}
    </div>
  );
};

export default UsersAll;

