// import { Stack } from '@mui/material';
// import React from 'react'

// const Skeleton = () => {
//   return (
//     <Stack spacing={{ xs: 1, sm: 2, md: 4 }}
// direction={{ xs: 'column', sm: 'row' }}
// useFlexGap flexWrap="wrap"
// alignItems="center"
// justifyContent="center"
// paddingBottom={4}
// paddingTop={3}
// >
// {inventory
//   .filter((item) => item.itemName.toLowerCase().includes(input.toLowerCase()))
//   .map((item) => (
//     <div key={item._id} className="flex flex-col items-center w-[350px] h-[300px] bg-white hover:bg-zinc-200 cursor-pointer p-4 shadow-md rounded-md ">
//       <h2 className="text-lg font-semibold mb-2">{item.itemName}</h2>
//       <p className="text-gray-600 mb-2">Item ID: {item.itemId.slice(0, 8)}</p>
//       <p className="text-gray-600">Quantity: {item.itemQuantity}</p>
//       <img src={removeSpacesAndSlashes(item.itemName)} alt={removeSpacesAndSlashes(item.itemName)}/>
//       {cartItems[item._id] == 0 || cartItems[item._id] === undefined ? (
//         <button className='w-[50%] bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded mt-4 '
//           onClick={() => {
//             addToCart(item._id);
//           }}
//         >
//       Add to cart
//       </button>
//       ) : (
//         <div className='flex flex-col items-center justify-center mt-8'>
//           <div className='flex'>
//             <button
//               className='font-bold text-xl bg-gray-400 hover:bg-gray-600 text-white pl-3 pr-3 pt-1 pb-1 ml-2 mr-2'
//               onClick={() => {
//                 removeFromCart(item._id);
//               }}
//             >
//               -
//             </button>

//             <p>
//               <b className='font-extra-bold text-xl'>{`${cartItems[item._id]}`}</b> in Cart
//             </p>

//             <button
//               className='font-bold text-xl bg-gray-400 text-white hover:bg-gray-600 pl-3 pr-3 pt-1 pb-1 ml-2 mr-2'
//               onClick={() => {
//                 addToCart(item._id);
//               }}
//             >
//               +
//             </button>
//           </div>
//           <div>
//             <button
//               className="w-[100%] bg-[#D83F31] hover:bg-[#CD1818] text-white font-bold py-2 px-4 rounded mt-4"
//               onClick={() => {
//                 deleteFromCart(item._id);
//               }}
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   ))}
//   </Stack>
//   )
// }

// export default Skeleton

import { MyLocationSharp } from '@mui/icons-material';
import { Stack, Skeleton } from '@mui/material';
import React from 'react';

const MySkeleton = () => {
  const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2, md: 4 }}
      direction={{ xs: 'column', sm: 'row' }}
      useFlexGap
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      paddingBottom={4}
      paddingTop={3}
    >
      {skeletonItems.map((index) => (
        <Skeleton variant="rounded" width={310} height={200} />
      ))}
    </Stack>
  );
};

export default MySkeleton;
