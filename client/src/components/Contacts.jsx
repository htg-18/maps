import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DevTeam from './DevTeam';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";

const Contacts = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        to_name: '',
        from_name: '',
        message: ''
    });

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_d1uiklq', 'template_z63d3w5', form.current, '78MzEAt30aJjXi2NI')
            .then((result) => {
                console.log(result.text);
                toast.success('Feedback Received!', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light',
                });

                // Clear form values
                setFormData({
                    to_name: '',
                    from_name: '',
                    message: ''
                });
            }, (error) => {
                console.log(error.text);
                toast.error('Invalid Admin Credentials', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='flex flex-col min-h-screen bg-zinc-300 items-center justify-center'>
            <h1 className='text-3xl text-teal-700 mb-5 font-bold'>Feedback Form</h1>
            <form ref={form} onSubmit={sendEmail} className='sm:w-[90%] md:w-[70%] lg:w-[50%] flex flex-col w-[50%] h-[40%] bg-white shadow-md rounded-[10px] px-8 pt-6 pb-8 mb-4 flex flex-col justify-evenly'>
                <label className='block text-gray-700 text-m font-bold mb-2 mt-4 flex items-center'>
                <FaUser className='m-[4px]'/>
                Name</label>
                <input
                    placeholder='Enter your name'
                    required
                    type="text"
                    name="to_name"
                    value={formData.to_name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
                <label className='block text-gray-700 text-m font-bold mb-2 mt-4 flex items-center'>
                <MdEmail className='m-[4px]'/>
                Email</label>
                <input
                    placeholder='enter you email'
                    required
                    type="email"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
                <label className='block text-gray-700 text-m font-bold mb-2 mt-4 flex items-center'>
                <AiFillMessage className='m-[4px]'/>
                Message</label>
                <textarea
                    placeholder='Feedback Message'
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    rows={6}
                />
                <button type="submit" className='bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Contacts;
