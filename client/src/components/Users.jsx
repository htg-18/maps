import React from 'react'
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import UsersAll from './UsersAll';
import { Stack } from '@mui/material';

const Users = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-zinc-300 min-h-screen min-w-screen flex flex-col items-center' style={{fontFamily: 'Figtree, sans-serif'}}> 
         <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        style={{width:'100%',display:'flex',justifyContent: 'center',alignItems: 'center',marginTop:30,marginBottom:30}}
      >
      <button className="flex w-[50%] md:w-[200px] justify-center   items-center bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 m-4 mb-13 rounded"
           onClick={() => navigate(-1)}>
           Admin Dashboard
         </button>
        <button className="flex w-[50%] md:w-[200px] items-center bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 mb-13 rounded"
           onClick={() => navigate('/createNewUser')}>
           <FaPlus className='mx-2'/>Add New Users
         </button>
         
        </Stack>
        <div>
            <UsersAll/>
        </div>
    </div>
  )
}

export default Users
