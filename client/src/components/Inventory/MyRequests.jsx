import React from 'react'
import PendingUserRequests from './PendingUserRequests';
import RejectedUserRequests from './RejectedUserRequests';

const MyRequests = () => {
  return (
    <div className='bg-zinc-300 flex flex-col items-center'>

      <h1 className='font-bold text-teal-900 text-[40px] m-6'>Inventory Requests</h1>
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
