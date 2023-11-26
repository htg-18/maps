import React from 'react'
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import UsersAll from './UsersAll';

const Users = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-zinc-300 h-min flex flex-col items-center'> 
        <div>
        <button className="flex items-center bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 mb-10 rounded"
           onClick={() => navigate('/createNewUser')}>
           <FaPlus className='mx-2'/>Add New Users
         </button>
        </div>
        <div>
            <UsersAll/>
        </div>
    </div>
  )
}

export default Users
