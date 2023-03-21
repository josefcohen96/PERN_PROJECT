import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';

function LocationPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await axios.get(`http://localhost:5000/location/${id}`);
        setLocation(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLocation();
  }, [id]);

  const updateLastVisit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/locations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lastVisit: moment().format('YYYY-MM-DD') }),
      });
      if (!response.ok) {
        throw new Error(`Failed to patch location with id ${id}`);
      }
      const data = await response.json();
      setLocation(data);
    } catch (error) {
      console.error(error);
    }
  };
  if (!location) {
    return <div>Loading...</div>;
  }

  const { name, freq, lastVisit, description, image } = location;

  return (

    <div className="location-page">
      <div className="location-page-header">

        <h1>{name}</h1>
        <p>Frequency: {freq}</p>
        <p>Last visit: {moment(lastVisit).format('MMMM Do, YYYY')}</p>
      </div>
      <div className="location-page-actions">
        <button onClick={updateLastVisit}>Update Last Visit</button>
        <Link to="/map">
          <button>Go back to Map</button>
        </Link>
      </div>
    </div >

  );
}

export default LocationPage;
