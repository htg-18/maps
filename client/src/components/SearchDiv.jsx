import React from 'react'

const SearchDiv = ({result}) => {
  return (
    <div className='flex flex-col rounded-[12px] bg-white mt-1 max-h-20 overflow-y-auto scrollbar-thin'>
      {/* {result.map((res)=>{
        <div>{res.itemName}</div>
      })} */}
      {result.map((res) => (
        <div 
          key={res.itemId}
          className='ml-6'
        >{res.itemName}<hr className='w-full'/></div>
        
      ))}
      
    </div>
  )
}

export default SearchDiv