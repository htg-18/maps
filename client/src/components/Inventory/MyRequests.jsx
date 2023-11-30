import React from 'react'
import PendingUserRequests from './PendingUserRequests';
import RejectedUserRequests from './RejectedUserRequests';
import { useNavigate } from 'react-router-dom';

const MyRequests = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-zinc-300 flex flex-col items-center'>

      <h1 className='font-bold text-teal-900 text-[40px] m-3'>Inventory Requests</h1>
      <button onClick={()=>{navigate(-1)}} className=' bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded mt-4 mb-6'>
        User Dashboard
      </button>
       <div className=' flex flex-col items-center m-6'>
        <PendingUserRequests />
       </div>

      <div className=' flex flex-col items-center m-6'>
        <RejectedUserRequests />
       </div>
    </div>
  )
}

export default MyRequests;
