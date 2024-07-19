import React, { useContext, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup, LayerGroup } from 'react-leaflet';
import LeafletControlGeocoder from './Geocoder';
import { stateColors, stateCoordinates, coordinates } from '../../../MapData';
import GeoContext from '../context/GeoContext';
import { useLocation } from 'react-router-dom';
import SearchInputs from './SearchInputs';

const States = () => {
    const { indiaStates, indiaDistrict } = useContext(GeoContext);
    const [marker, setMarker] = useState(null);
    const location = useLocation();
    const selectedState = location.state?.selectedState;
    const stores = location.state?.stores;
    const selectedAudit = location.state?.selectedAudit;
    const selectedZone = location.state?.selectedZone;
    const selectedFormat = location.state?.selectedFormat;
    const selectedSubformat = location.state?.selectedSubformat;

    if (!indiaStates || !indiaDistrict) {
        return <div>Loading...</div>;
    }

    const filteredDistricts = indiaDistrict.features.filter(feature =>
        feature.properties.NAME_1 === selectedState ||
        (Array.isArray(selectedState) && selectedState.includes(feature.properties.NAME_1))
    );

    const geoJsonStyle = (feature) => {
        const isStateSelected = Array.isArray(selectedState)
            ? selectedState.includes(feature.properties.NAME_1)
            : selectedState === feature.properties.NAME_1;

        return {
            color: stateColors[feature.properties.NAME_1],
            weight: isStateSelected ? 0.5 : 0,
            opacity: 1,
            fillOpacity: isStateSelected ? 0.4 : 0,
        };
    };

    const districtStyle = {
        weight: 1,
        opacity: 0.4,
        fillOpacity: 0,
        color: "blue"
    };

    const onEachDistrictFeature = (feature, layer) => {
        layer.on({
            mouseover: (e) => {
                const districtName = e.target.feature.properties.NAME_2;
                layer.bindTooltip(districtName, {
                    permanent: false,
                    direction: 'center',
                    className: 'leaflet-district-label'
                });
                layer.openTooltip();
            },
            mouseout: () => {
                layer.closeTooltip();
            },
            click: (e) => {
                const { lat, lng } = e.latlng;
                setMarker({ lat, lng, name: feature.properties.NAME_2 });
            },
        });
    };

    const CustomMarker = ({ marker }) => {
        const map = useMap();

        if (marker) {
            const leafletMarker = L.marker([marker.lat, marker.lng]).addTo(map)
                .bindPopup(marker.name)
                .openPopup();

            setTimeout(() => {
                map.removeLayer(leafletMarker);
            }, 2000);

            return null;
        }
        return null;
    };

    let initialCenter = { lat: 22.9734, lng: 78.6569 };
    if (!Array.isArray(selectedState)) {
        const stateCoord = stateCoordinates.find(item => item.states.includes(selectedState));
        if (stateCoord) {
            initialCenter = coordinates[stateCoord.coordKey];
        }
    } else {
        const stateCoord = stateCoordinates.find(item => selectedState.some(state => item.states.includes(state)));
        if (stateCoord) {
            initialCenter = coordinates[stateCoord.coordKey];
        }
    }

    return (
        <div className='flex items-center justify-center gap-5 mt-[15px]'>
            <MapContainer
                center={[initialCenter.lat, initialCenter.lng]}
                zoom={6}
                style={{ height: '100vh', width: '100vw', zIndex: '1', marginTop: 0, top: '-20px' }}
                maxBounds={[[5.5546079, 65.1113787], [39.6745457, 99.395561]]}
            >
                <LeafletControlGeocoder />
                <SearchInputs selectedAudit={selectedAudit} selectedZone={selectedZone} selectedFormat={selectedFormat} selectedSubformat={selectedSubformat} />
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />
                <GeoJSON data={indiaStates} style={geoJsonStyle} />
                <GeoJSON data={filteredDistricts} style={districtStyle} onEachFeature={onEachDistrictFeature} />
                <LayerGroup>
                    {stores?.map((store, idx) => {
                        const lat = parseFloat(store.LATITUDE);
                        const lng = parseFloat(store.LONGITUDE);
                        const position = [lat, lng];
                        let color = store.RAG?.toLowerCase();
                        if (color === 'amber') color = 'yellow';

                        return (
                            <Marker
                                key={idx}
                                position={position}
                                icon={new L.Icon({
                                    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    tooltipAnchor: [16, -28],
                                    shadowSize: [41, 41]
                                })}
                                eventHandlers={{
                                    mouseover: (e) => {
                                        if(color=='yellow')color='amber'
                                        e.target.bindTooltip(color, {
                                            permanent: false,
                                            direction: 'top',
                                            className: 'leaflet-tooltip',
                                        }).openTooltip();
                                    },
                                    mouseout: (e) => {
                                        e.target.closeTooltip();
                                    }
                                }}
                            >
                                <Popup >
                                    <div>
                                        <p><b>Site Code :</b> {store.STORE_CODE}</p>
                                        <p><b>Site Name :</b> {store.STORE_SITENAME}</p>
                                        {store.Auditor && <p><b>Auditor : </b>{store.Auditor}</p>}
                                        {selectedAudit==="MOPR" && <p><b>MOPR Rating :</b> {store.MOPR_Rating}%</p>} 
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </LayerGroup>
                <CustomMarker marker={marker} />
            </MapContainer>
        </div>
    );
};

export default States;

