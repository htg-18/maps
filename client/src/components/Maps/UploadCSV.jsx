import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DownloadCSV from './DownloadCSV';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', file);
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_HOST_URL}/uploadEmp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(response.error);
      console.log('File uploaded successfully', response.data);
      setTimeout(() => {
        toast.success('File Successfully inserted in DB...', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 1000); 
      }, 1000);
    } catch (error) {
      console.error('Error uploading file',error.response.data.error);
      setLoading(false);
      setFile()
      toast.error(error.response.data.error, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <div className='mb-5 flex flex-col items-center gap-4 justify-center'>
      <div className='flex items-center justify-center'>
        <input 
          type="file" 
          accept=".csv"
          onChange={handleFileChange} 
          ref={fileInputRef}
        />
        <button 
          onClick={handleFileUpload} 
          className='bg-[#2c2c2c] text-white h-10 w-20'>
          Upload
        </button>
      </div>
      <div className='flex flex-row'>
        {loading && <p className='text-zinc-500 text-xl'>Uploading...</p>}
      </div>
      <DownloadCSV/>
    </div>
  );
};

export default UploadCSV;
