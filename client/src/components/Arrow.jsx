import React,{useEffect,useState} from 'react'
import { FaArrowUp } from "react-icons/fa";
const Arrow = () => {
  const [backToTop,setBackToTop]=useState(false)
  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY>280){
        setBackToTop(true)
      }else{
        setBackToTop(false)
      }
    })
  },[])

  const scrollUp=()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
  return (
    <div className=''>
    { backToTop &&
        <button className='h-12 w-12 opacity-80 rounded-full bg-zinc-200 hover:opacity-100 flex items-center justify-center bottom-[30px] right-[50px] fixed text-3xl ' onClick={scrollUp}>
        <FaArrowUp className='text-2xl text-teal-600'/>
        </button>
    }
    </div>
  )
}

export default Arrow