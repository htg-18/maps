import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AuditsInDB } from '../../../MapData';

const GeoContext = createContext();

export const GeoProvider = ({ children }) => {
    const [indiaStates, setIndiaStates] = useState();
    const [indiaDistrict, setIndiaDistrict] = useState();
    // const [redStores,setRedStores] = useState();
    const [statesForZones,setStatesForZones] = useState();
    const apiCallsMade = useRef({ states: false, districts: false });
    useEffect(()=>{
        
        const getStatesForZones=async()=>{
            const resdata=await axios.get(`${import.meta.env.VITE_REACT_API_HOST_URL}/getZones`)
            setStatesForZones(resdata.data)
        }
        getStatesForZones()
    },[])
    useEffect(() => {
        const getState = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_HOST_URL}/geojson/IndiaStates`);
                if (response.data) {
                    setIndiaStates(response.data);
                }
            } catch (error) {
                console.error('Error fetching GeoJSON:', error);
            }
        };
        const getDistricts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_HOST_URL}/geojson/IndiaDistricts`);
                if (response.data) {
                    setIndiaDistrict(response.data);
                }
            } catch (error) {
                console.error('Error fetching GeoJSON:', error);
            }
        };

        if (!apiCallsMade.current.states && !indiaStates) {
            apiCallsMade.current.states = true;
            getState();
        }

        if (!apiCallsMade.current.districts && !indiaDistrict) {
            apiCallsMade.current.districts = true;
            getDistricts();
        }
    }, [indiaStates, indiaDistrict]);

    return (
        <GeoContext.Provider value={{ indiaStates, indiaDistrict  ,statesForZones }}>
            {children}
        </GeoContext.Provider>
    );
};

export default GeoContext;
