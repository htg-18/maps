import React from 'react'
import { useNavigate } from 'react-router-dom';

const Admindashboard = () => {
  const navigate = useNavigate();


  return (
    <div className='bg-rose-300 h-screen flex flex-col items-center'>
    <div className="border border-red-400">
       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
           onClick={() => navigate('/adminrequest')}>
             Request from management
         </button>
   
    </div>
 </div>
  )
}

export default Admindashboard
