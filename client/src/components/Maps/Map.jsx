import React, { useContext } from 'react';
import MapComponent from './MapComponent';
import UploadCSV from './UploadCSV';
import GeoContext from '../context/GeoContext';
import { CircularProgress, Box, Backdrop } from '@mui/material';

const Map = () => {
  const { indiaStates } = useContext(GeoContext);

  return (
    <div className='flex flex-col bg-zinc-300 pt-[23px] max-w-full min-w-full min-h-screen'>
      {!indiaStates ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>

          <CircularProgress
            sx={{
              '& .MuiCircularProgress-circle': {
                stroke: 'url(#gradient)',
              },
            }}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#e01cd5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#1CB5E0', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </Box>
        </Backdrop>
      ) : (
        <>
          <MapComponent />
          <UploadCSV />
        </>
      )}
    </div>
  );
};

export default Map;
