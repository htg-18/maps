import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LeafletControlGeocoder from './Geocoder';
import { zones } from '../../../MapData';
const PanIndia = () => {
    const [selectedZone,setSelectedZone]=useState("All")
    const handleZoneChange = (e) => {
        if(e.target.value){
            const selectedZone = e.target.value;
            if (zones.includes(selectedZone)) {
                setSelectedZone(selectedZone);
            }
        }else{
            setSelectedZone("All")
        }
    }
    useEffect(()=>{
        console.log(selectedZone);
    },[selectedZone])
  return (
    <div className='flex items-center justify-center gap-5 mt-[15px]'>
            <MapContainer
                center={[22.9734, 78.6569]}
                zoom={4}
                style={{ height: '100vh', width: '100vw', zIndex: '1', marginTop: 0, top: '-20px' }}
                maxBounds={[[5.5546079, 65.1113787], [39.6745457, 99.395561]]}
            >
            <div style={{zIndex:10000,backgroundColor: 'rgba(40, 45, 55, 0.6)'}} className='rounded-[12px] absolute left-[60px] top-[15px] h-[150px] w-[250px] flex flex-col items-center justify-center gap-5'>
            <input
                list="zoneList"
                placeholder='Zone :All'
                onChange={handleZoneChange}
                className='pl-3 rounded-[12px] min-h-[35px] w-[225px] border-none outline-none'
                style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
            />
            <datalist id="zoneList">
                {zones.map((zone) => {
                    return <option key={zone} value={zone}>{zone}</option>
                })}
            </datalist>
            <button className='bg-orange-500 hover:bg-orange-700 h-10 w-40 text-white text-[17px] font-semibold rounded-[12px]'>Search</button>
            </div>
            <LeafletControlGeocoder />
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />
            </MapContainer>
        </div>
  )
}

export default PanIndia