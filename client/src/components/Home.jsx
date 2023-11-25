import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-rose-300 '>
       <div>
        <h1 className='text-center pt-10 text-[40px]'>LNMIIT INVENTORY</h1>
       </div>
       <div className="flex flex-col h-screen justify-center items-center mt-[-100px]">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded" onClick={() => navigate('/adminlogin')}>Admin Login</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/userlogin')}>User Login</button>
      </div>
    </div>
  )
}

export default Home
