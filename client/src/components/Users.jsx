import React from 'react'
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import UsersAll from './UsersAll';

const Users = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-zinc-300 min-h-screen min-w-screen flex flex-col items-center' style={{fontFamily: 'Figtree, sans-serif'}}> 
        <div className='flex w-[100%] justify-center'>
        <button className="flex w-[20%] items-center bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 mb-10 rounded"
           onClick={() => navigate('/createNewUser')}>
           <FaPlus className='mx-2'/>Add New Users
         </button>
         <button className="flex w-[20%] justify-center   items-center bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 mb-10 rounded"
           onClick={() => navigate(-1)}>
           Back
         </button>
        </div>
        <div>
            <UsersAll/>
        </div>
    </div>
  )
}

export default Users
