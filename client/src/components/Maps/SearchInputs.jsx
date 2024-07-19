import React from 'react'

const SearchInputs = ({selectedAudit,selectedZone,selectedFormat,selectedSubformat}) => {
  return (
    <div className='flex flex-col gap-3 absolute left-[60px] top-[10px] rounded-[12px] w-[295px]' style={{ zIndex: '10000' }}>
        <input 
                disabled={true}
                value={selectedFormat}
                className='pl-3 rounded-[12px] min-h-[35px] w-[260px] border-none outline-none bg-white'
                style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
        />
        <input 
           disabled={true}  
           value={selectedZone}
           className='pl-3 rounded-[12px] min-h-[35px] w-[260px] border-none outline-none bg-white'
           style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
           />
        <input 
           disabled={true} 
           value={selectedAudit}
           className='pl-3 rounded-[12px] min-h-[35px] w-[260px] border-none outline-none bg-white'
           style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }} />
        <input 
           disabled={true} 
           value={selectedSubformat}
           className='pl-3 rounded-[12px] min-h-[35px] w-[260px] border-none outline-none bg-white'
           style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
         />
    </div>
  )
}

export default SearchInputs