import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup, LayersControl, Pane } from 'react-leaflet';
import L from 'leaflet';
import locationsData from './locations.json';
import icon from "./images/yosef.png";

import './Map.css';

function MapPage() {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const map = mapRef.current;
    const myIcon = L.icon({
      iconUrl: icon,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });


    if (!map) return;

    locations.forEach((location) => {
      const { name, freq, lastVisit, coordinates, id } = location;
      const marker = L.marker(coordinates, { icon: myIcon }).addTo(map);
      marker.bindPopup(
        `<b>${name}</b><br />Frequency: ${freq}<br />Last visit: ${lastVisit}<br /><a href="/location/${id}">View details</a>`
      );
    });
  }, [locations]);

  useEffect(() => {
    setLocations(locationsData);
  }, []);

  useEffect(() => {
    if (searchValue === '') {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter((location) =>
        location.direction.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchValue, locations]);

  const changeMapView = (lat, lng, zoom) => {
    const map = mapRef.current;
    if (!map) return;

    map.setView([lat, lng], zoom);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search or any other action here
  };

  return (
    <div className="MapPage">
      <MapContainer
        center={[31.5, 34.9]}
        zoom={10.2}
        style={{ height: '100vh', width: '100%' }}
        whenCreated={(map) => (mapRef.current = map)}
        zoomControl={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {filteredLocations.map((location) => (
          <Marker key={location.id} position={location.coordinates}>
            {searchValue && !location.direction.toLowerCase().includes(searchValue.toLowerCase()) ? null : (
              <Popup>
                <b>{location.name}</b>
                <br />
                Frequency: {location.freq}
                <br />
                Last visit: {location.lastVisit}
                <br />
                <a href={`/location/${location.id}`}>View details</a>
                <br />
                <button onClick={() => changeMapView(location.coordinates[0], location.coordinates[1], 15)}>Zoom In</button>
              </Popup>
            )}
          </Marker>
        ))}
        <ZoomControl position="topright" />
        <Pane className="search-pane" position="bottomleft">
          <div className="search-box">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search by direction (e.g., north, south)"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </Pane>
      </MapContainer>
    </div>
  );
}

export default MapPage;
