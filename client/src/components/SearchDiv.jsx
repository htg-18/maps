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
      <style>
        {`
          /* width */
          ::-webkit-scrollbar {
            width: 10px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey;
            border-radius: 10px;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #F4CE14;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  )
}

export default SearchDiv