import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-zinc-300 flex flex-col pt-[23px] max-w-full min-w-full min-h-screen ' >
      
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={4}
        style={{ height: '100vh', maxWidth: '100vw', zIndex: '1', marginTop: 0, top: '-20px' }}
        maxBounds={[[6.5546079, 68.1113787], [35.6745457, 97.395561]]}
      >
        <div className="flex flex-col h-screen justify-center items-center mt-auto  absolute right-0 w-[30%] min-h-screen pl-3 pr-3" style={{ backgroundColor: 'rgba(40, 45, 55, 0.7)' , zIndex: '10000'}}>
          <h1 className='text-center text-white pb-10 text-4xl'>StoreMap Reliance Retail
        </h1>
          <button className="hover:bg-orange-700 bg-orange-600 text-white top-[-1px] py-2 px-4 m-4 rounded text-xl" onClick={() => navigate('/adminlogin')}>Admin Login</button>
      </div>
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
      </MapContainer>
      
    </div>
  )
}

export default Home
