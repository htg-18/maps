import React from 'react'

const DeleteUser = ({setModalVisible}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalVisible(false);
       
      };
  return (
    <div className='flex flex-col items-center justify-center font-bold'>
        <h1 className='text-[#CD1818] text-xl'>Are you sure you want to DELETE user?</h1>
        <div className='flex w-full items-center justify-around'>
        <button type="submit" onClick={handleSubmit} className="w-[35%] bg-[#D83F31] hover:bg-[#CD1818] text-white font-bold py-2 px-4 rounded mt-4">Delete</button>
        <button type="submit" onClick={handleSubmit} className="w-[35%] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
              Back
            </button>
        
        </div>
    </div>
  )
}

export default DeleteUser