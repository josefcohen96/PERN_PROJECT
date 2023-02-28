// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useRef } from 'react';
// import icon from "./images/yosef.png";
// function MapPage() {
//   const mapRef = useRef(null);

//   const myIcon = L.icon({
//     iconUrl: icon,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//   });

//   useEffect(() => {
//     const map = mapRef.current;

//     if (!map) return;

//     const myMarker = L.marker([31.5, 34.9]).addTo(map);
//     myMarker.bindPopup("<b>Hello world!</b><br>This is my marker.").openPopup();
//   }, []);

//   return (
//     <div className="App">
//       <MapContainer
//         center={[31.5, 34.9]}
//         zoom={10.2}
//         style={{ height: '100vh', width: '100%' }}
//         whenCreated={(map) => (mapRef.current = map)}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[31.5, 34.9]}icon= {myIcon}>
//           <Popup>
//             <b>Hello world!</b>
//             <br />
//             This is my marker.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

// export default MapPage;

import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import locationsData from './locations.json';
import icon from "./images/yosef.png";

function MapPage() {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const myIcon = L.icon({
      iconUrl: icon,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    locations.forEach((location) => {
      const { name, freq, lastVisit, coordinates} = location;
      const marker = L.marker(coordinates, { icon: myIcon }).addTo(map);
      marker.bindPopup(
        `<b>${name}</b><br />Frequency: ${freq}<br />Last visit: ${lastVisit}`
      );
    });
  }, [locations]);

  useEffect(() => {
    setLocations(locationsData);
  }, []);

  return (
    <div className="App">
      <MapContainer
        center={[31.5, 34.9]}
        zoom={10.2}
        style={{ height: "100vh", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}
export default MapPage;
