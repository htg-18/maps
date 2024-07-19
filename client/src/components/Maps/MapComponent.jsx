import React, { useState, useEffect, useContext, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import LeafletControlGeocoder from './Geocoder';
import { useNavigate } from 'react-router-dom';
import { stateColors, statesInDB, AuditsInDB, formats,subFormats,audits } from '../../../MapData';
import GeoContext from '../context/GeoContext';
import Filters from './Filters';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MapComponent = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();
  const { indiaStates, statesForZones } = useContext(GeoContext);
  const [selectedFormat, setSelectedFormat] = useState("All Stores");
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedAudit, setSelectedAudit] = useState("Inventory Hygiene Score");
  const [selectedSubformat, setSelectedSubformat] = useState("All Subformats");
  const [stores, setStores] = useState(null);
  const [redStores, setRedStores] = useState([]);
  const geoJsonRef = useRef(); 

  useEffect(() => {
    const getRedStore = async () => {
      const res = await axios.get(`${import.meta.env.VITE_REACT_API_HOST_URL}/getRedStores/${AuditsInDB[selectedAudit]}`);
      setRedStores(res.data);
    };
    if(audits.includes(selectedAudit)){
      getRedStore();
    }
  }, [selectedAudit]);

  useEffect(() => {
    const getStatesForSelectedZone = (zone) => {
      if (Array.isArray(statesForZones)) {
        const zoneData = statesForZones.find(z => z._id === zone);
        return zoneData ? zoneData.states : [];
      }
      return [];
    };
    const states = getStatesForSelectedZone(selectedZone);
    setStates(states);
  }, [selectedZone, statesForZones]);

  useEffect(() => {
    if (selectedState) {
      const selectedCoordKeys = Array.isArray(selectedState)
        ? selectedState.flatMap(state => {
            const stateInfo = statesInDB.find(obj => obj.states.includes(state));
            return stateInfo ? stateInfo.coordKey : [];
          })
        : statesInDB.find(obj => obj.states.includes(selectedState))?.coordKey;
  
      const foundState = states.includes(selectedCoordKeys[0]);
      const fetchStores = async () => {
        if (selectedState) {
          const statesToProcess = Array.isArray(selectedState) ? selectedState : [selectedState];
          const stKeys = statesToProcess.map(stateName => {
            const st = statesInDB.find(stateObj => {
              return stateObj.states.includes(stateName);
            });
  
            return st ? st.coordKey : null;
          }).filter(key => key !== null);
  
          if (stKeys.length > 0 && (foundState || selectedZone === "All")) {
            if(formats.includes(selectedFormat) && subFormats.includes(selectedSubformat) && audits.includes(selectedAudit)){
              const res = await axios.get(`${import.meta.env.VITE_REACT_API_HOST_URL}/getStores/${stKeys[0]}/${selectedFormat}/${AuditsInDB[selectedAudit]}/${selectedSubformat}`);
              const data = res.data;
              setStores(data);
            }else{
              toast.error('Enter Valid Fields', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
              });
            }
          }
        }
      };
      fetchStores();
      if (selectedState && stores && (foundState || selectedZone === "All") ) {
        navigate("/admin/state", {
          state: { selectedState , stores , selectedZone , selectedAudit , selectedFormat , selectedSubformat }
        });
      }
      if (!foundState && selectedZone !== "All" ) {
        toast.error('State not in Selected Zone', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    }
  }, [selectedState, states, stores, navigate, selectedFormat]);

  const geoJsonStyle = (feature) => {
    const defaultStyle = {
      color: stateColors[feature.properties.NAME_1],
      weight: 1,
      opacity: 1,
      fillOpacity: 0.5,
    };

    if (selectedState) {
      if (Array.isArray(selectedState)) {
        if (!selectedState.includes(feature.properties.NAME_1)) {
          return {
            ...defaultStyle,
            fillOpacity: 0.2,
          };
        }
      } else if (feature.properties.NAME_1 !== selectedState) {
        return {
          ...defaultStyle,
          fillOpacity: 0.2,
        };
      }
    }
    return defaultStyle;
  };

  const handleStateClick = (event) => {
    const stateName = event.layer.feature.properties.NAME_1;
    let selectedStates = [];

    if (stateName === "Maharashtra" || stateName === "Goa") {
      selectedStates = ["Maharashtra", "Goa"];
    } else if (stateName === "Madhya Pradesh" || stateName === "Chhattisgarh") {
      selectedStates = ["Madhya Pradesh", "Chhattisgarh"];
    } else if (stateName === "Sikkim" || stateName === "West Bengal") {
      selectedStates = ["Sikkim", "West Bengal"];
    } else if (stateName === "Assam" || stateName === "Manipur" || stateName ==="Tripura" || stateName === "Nagaland" || stateName === "Mizoram" || stateName === "Meghalaya" || stateName === "Arunachal Pradesh") {
      selectedStates = ["Assam", "Manipur", "Tripura", "Nagaland", "Mizoram", "Arunachal Pradesh", "Meghalaya"];
    } else if (stateName === "Jammu and Kashmir" || stateName === "Uttaranchal" || stateName === "Himachal Pradesh") {
      selectedStates = ["Jammu and Kashmir", "Himachal Pradesh", "Uttaranchal"];
    } else if (stateName === "Haryana" || stateName === "Delhi") {
      selectedStates = ["Haryana", "Delhi"];
    } else {
      selectedStates = [stateName];
    }
    setSelectedState(selectedStates);
  };

  const onEachState = (state, layer) => {
    const stateName = state.properties.NAME_1;
    const stateHovered = statesInDB.find(stateObj => stateObj.states.includes(stateName));
    const labelContent = stateHovered ? stateHovered.coordKey : stateName;
    const redStore = redStores ? redStores.find(redStore => redStore._id === stateHovered?.coordKey) : null;
    const count = redStore ? redStore.count : 0;
    const labelHtml = `<div class="text-md">${labelContent} <b><span class="text-red-700">(${count}) Red Stores</span></b></div>`;

    layer.bindTooltip(labelHtml, {
      permanent: false,
      direction: 'center',
      className: 'leaflet-state-label'
    });

    layer.on({
      mouseover: () => {
        layer.openTooltip();
      },
      mouseout: () => {
        layer.closeTooltip();
      }
    });
  };

  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer(layer => {
        const state = layer.feature;
        onEachState(state, layer);
      });
    }
  }, [redStores]);

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center gap-5'>
          <MapContainer
            center={[22.9734, 78.6569]} zoom={4}
            style={{ height: '100vh', width: '100vw', zIndex: '1', marginTop: 0, top: '-20px' }}
            maxBounds={[[6.5546079, 68.1113787], [35.6745457, 97.395561]]}
          >
            <LeafletControlGeocoder />
            <Filters  isDisabled={false} setSelectedFormat={setSelectedFormat} setSelectedZone={setSelectedZone} setSelectedAudit={setSelectedAudit} setSelectedSubformat={setSelectedSubformat}/>
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />
            <GeoJSON ref={geoJsonRef} data={indiaStates} style={geoJsonStyle} eventHandlers={{ click: handleStateClick }} onEachFeature={onEachState} />
          </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;

