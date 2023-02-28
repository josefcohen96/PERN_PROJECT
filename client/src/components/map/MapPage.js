import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import locationsData from './locations.json';
import icon from "./images/yosef.png";
import chroma from 'chroma-js';
import Navbar from '../NavBar/NavBar';


function MapPage() {

  function getColor(lastVisit, freq) {
    const daysSinceLastVisit = (Date.now() - Date.parse(lastVisit)) / (1000 * 60 * 60 * 24);
    const urgency = freq / daysSinceLastVisit;

    // scale the urgency value to the range [0, 1]
    const normalizedUrgency = Math.max(0, Math.min(urgency / 5, 1));

    // use a gradient from green to red
    const colorScale = chroma.scale(['green', 'red']).mode('lch');
    return colorScale(normalizedUrgency).hex();
  }

  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    locations.forEach((location) => {
      const { name, freq, lastVisit, coordinates } = location;
      const markerColor = getColor(lastVisit, freq);
      const myIcon = L.icon({
        iconUrl: icon,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        shadowUrl: `https://leaflet.github.io/leaflet-shadow/leaflet-${markerColor}-shadow.png`,
        shadowSize: [50, 50],
        shadowAnchor: [25, 50],
      });
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
      <Navbar />
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
