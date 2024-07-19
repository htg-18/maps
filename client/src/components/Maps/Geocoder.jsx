
// import { useEffect } from "react";
// import { useMap } from "react-leaflet";
// import "./geocoder.css"
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import L from "leaflet";

// import icon from "../constants";

// export default function LeafletControlGeocoder() {
//   const map = useMap();

//   useEffect(() => {
//     let geocoder = L.Control.Geocoder.nominatim();

//     if (typeof URLSearchParams !== "undefined" && location.search) {
//       const params = new URLSearchParams(location.search);
//       const geocoderString = params.get("geocoder");
//       if (geocoderString && L.Control.Geocoder[geocoderString]) {
//         geocoder = L.Control.Geocoder[geocoderString]();
//       } else if (geocoderString) {
//         console.warn("Unsupported geocoder", geocoderString);
//       }
//     }
//     const control = L.Control.geocoder({
//       query: "",
//       placeholder: "Enter the Location",
//       defaultMarkGeocode: false,
//       geocoder
//     });

//     control.on("markgeocode", function (e) {
//       map.eachLayer(layer => {
//         if (layer instanceof L.Marker) {
//           map.removeLayer(layer);
//         }
//       });
//       const latlng = e.geocode.center;
//       const marker = L.marker(latlng, { icon })
//         .addTo(map)
//         .bindPopup(e.geocode.name)
//         .openPopup();

//       map.fitBounds(e.geocode.bbox);
//       setTimeout(() => {
//         map.removeLayer(marker);
//       }, 500); 
//     });
//     control.addTo(map);
//     return () => {
//       control.remove();
//     };
//   }, [map]);

//   return null;
// }

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "./geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

import icon from "../../constants";

export default function LeafletControlGeocoder() {
  const map = useMap();

  useEffect(() => {
    let geocoder = L.Control.Geocoder.nominatim();

    if (typeof URLSearchParams !== "undefined" && location.search) {
      const params = new URLSearchParams(location.search);
      const geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }
    const control = L.Control.geocoder({
      query: "",
      placeholder: "Enter the Location",
      defaultMarkGeocode: false,
      geocoder
    });

    control.on("markgeocode", function (e) {
      // Remove only geocoder markers
      const geocoderMarkers = map._layers; 
      Object.keys(geocoderMarkers).forEach(layerId => {
        const layer = geocoderMarkers[layerId];
        if (layer instanceof L.Marker && layer._popup && layer._popup.getContent() === e.geocode.name) {
          map.removeLayer(layer);
        }
      });
      
      const latlng = e.geocode.center;
      const marker = L.marker(latlng, { icon })
        .addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();

      map.fitBounds(e.geocode.bbox);
      setTimeout(() => {
        map.removeLayer(marker);
      }, 500); 
    });
    control.addTo(map);
    return () => {
      control.remove();
    };
  }, [map]);

  return null;
}
