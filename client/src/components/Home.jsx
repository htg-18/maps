
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import lnmiit from "../assets/lnmiit.jfif"
import { Stack } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-zinc-300 '>
    {/* <Navbar/> */}
    <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 1, md: 2 }}
  style={{display:'flex',alignItems: 'center',justifyContent: 'center',paddingBottom:'20px'}}

>
 <div className="flex flex-col h-screen  justify-center items-center mt-auto">
        <h1 className='text-center text-teal-700 font-bold pb-10 text-[35px]'>LNMIIT INVENTORY</h1>
        <button className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 m-4 rounded" onClick={() => navigate('/adminlogin')}>Admin Login</button>
        <button className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/userlogin')}>User Login</button>
      </div>

    <figure className="bg-slate-100 rounded-xl p-8 dark:bg-white w-[50%]">
  <img className="w-50 h-25 rounded-[12px] mx-auto" src={lnmiit} alt="" width="384" height="512" />
  {/* <div className="pt-6 text-center space-y-4">
    <blockquote>
      <p className="text-lg font-medium">
      Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
      </p>
    </blockquote>
    <figcaption className="font-medium">
      <div className="text-teal-700 dark:text-teal-700">
        Harsh Shah
      </div>
      <div className="text-slate-700 dark:text-slate-500">
        Staff Engineer, Google
      </div>
    </figcaption>
  </div> */}
</figure>
      {/* <div className=''>
       
      </div> */}
     
      </Stack>
      {/* <Footer/> */}
      

    </div>
  )
}

export default Home
