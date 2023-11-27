

// import React, { useState } from 'react';
// import EditUser from './EditUser';

// const SimpleModal = ({ setUserHome, uid }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(true);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (!email || !phone) {
//       alert('Email and Phone are required!');
//       return;
//     }

//     if (!/^\d{10}$/.test(phone)) {
//       alert('Phone number must be exactly 10 digits!');
//       return;
//     }

//     // Collect user data and close the modal
//     const userData = {
//       name,
//       email,
//       phone,
//     };
//     setUserHome(userData);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="modal-wrapper">
//       {isModalOpen && (
//         <>
//           <div className="blurBackground"></div>
//           <div className="modalContainer">
//             <EditUser />
//           </div>
//         </>
//       )}

//       {/* Rest of your component */}
//       <style>
//         {`
//           /* Add this to your existing styles or create a new CSS file */

//           .modal-wrapper {
//             position: fixed;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             top: 0;
//             width:'50%';
//             height:'50%';
//           }

//           .blurBackground {
//             position: fixed;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             top: 0;
//             backdrop-filter: blur(8px);
//             background-color: rgba(0, 0, 0, 0.5);
//             z-index: 1; /* Ensure it is above other content */
//           }

//           .modalContainer {
//             position: fixed;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             background-color: white;
//             padding: 20px;
//             border-radius: 10px;
//             z-index: 2; /* Ensure it is above the blurred background */
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default SimpleModal;
import React from 'react';
import EditUser from './EditUser';

const Modal = ({ setModalVisible }) => {
  return (
    <div className="modal-wrapper" onClick='' style={{fontFamily: 'Figtree, sans-serif'}}>
      <div className="modal-content">
        {/* Your modal content goes here */}
        <EditUser setModalVisible={setModalVisible}/>
      </div>
      <style>
        {`
          /* Add this to your existing styles or create a new CSS file */

          .modal-wrapper {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(8px);
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1; /* Ensure it is above other content */
          }

          .modal-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 2; /* Ensure it is above the blurred background */
          }
        `}
      </style>
    </div>
  );
};

export default Modal;

