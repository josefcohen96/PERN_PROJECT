import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
} from "@mui/material";
import Navbar from "../NavBar/NavBar";



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

  const updateLastVisit = async (locationId) => {
    try {
      console.log(id)
      const response = await axios.post(`http://localhost:5000/locations/${id}`, { locationId: locationId });
      if (!response.ok) {
        throw new Error(`Failed to patch location with id ${id}`);
      }
      const data = response.data
      setLocation(data);
    } catch (error) {
      console.error(error);
    }
  };
  if (!location) {
    return <Box>Loading...</Box>;
  }

  const { name, freq, lastVisit } = location;
  // const { name, freq, lastVisit, description, image } = location;

  return (

    <Box >
      <Navbar />
      <Box sx={{ alignItems: "center", width: "100%" }} className="container">

        <Box >
          <h1>{name}</h1>
          <p>Frequency: {freq}</p>
          <p>Last visit: {moment(lastVisit).format('MMMM Do, YYYY')}</p>
        </Box>
        <Box>
          <Button onClick={updateLastVisit}>Update Last Visit</Button>
          <Link to="/map">
            <Button>Go back to Map</Button>
          </Link>
        </Box>
      </Box >
    </Box >

  );
}

export default LocationPage;
