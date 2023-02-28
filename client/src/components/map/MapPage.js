// import React, { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import './Map.css';
// import 'leaflet/dist/leaflet.css';

// // import nationalParks from './national-parks.json';

// delete L.Icon.Default.prototype._getIconUrl;

// // Importing images from locally stored assets to address a bug
// // in CodeSandbox: https://github.com/codesandbox/codesandbox-client/issues/3845

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('./images/1.png'),
//   iconUrl: require('./images/2.png'),
//   shadowUrl: require('./images/3.png')
// });

// // When importing into your own app outside of CodeSandbox, you can import directly
// // from the leaflet package like below
// //
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
// //   iconUrl: require('leaflet/dist/images/marker-icon.png'),
// //   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// // });

// function MapPage() {
//   const mapRef = useRef();

//   useEffect(() => {
//     const { current = {} } = mapRef;
//     const { leafletElement: map } = current;

//     if (!map) return;

//     const myMarker = L.marker([31.5, 34.9]).addTo(map);
//     myMarker.bindPopup("<b>Hello world!</b><br>This is my marker.");
//     myMarker.bringToFront();


//     // const parksGeoJson = new L.GeoJSON(nationalParks, {
//     //   onEachFeature: (feature = {}, layer) => {
//     //     const { properties = {} } = feature;
//     //     const { Name } = properties;

//     //     if (!Name) return;

//     //     layer.bindPopup(`<p>${Name}</p>`);
//     //   }
//     // });

//     // parksGeoJson.addTo(map);
//   }, [])

//   return (
//     <div className="App">
//       <MapContainer center={[31.5, 34.9]} zoom={10.2}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
//       </MapContainer>
//     </div>
//   );
// }

// export default MapPage;

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import icon from "./images/yosef.png";
function MapPage() {
  const mapRef = useRef(null);

  const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    const map = mapRef.current;
   
    if (!map) return;

    const myMarker = L.marker([31.5, 34.9]).addTo(map);
    myMarker.bindPopup("<b>Hello world!</b><br>This is my marker.").openPopup();
  }, []);


  return (
    <div className="App">
      <MapContainer
        center={[31.5, 34.9]}
        zoom={10.2}
        style={{ height: '100vh', width: '100%' }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={[31.5, 34.9]}icon= {myIcon}>
          <Popup>
            <b>Hello world!</b>
            <br />
            This is my marker.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapPage;
