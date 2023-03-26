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
        console.log(response)
        setLocation(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLocation();
  }, [id]);



  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/locations/${id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationid: id })
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`Failed to patch location with id ${id}`);
      }
      console.log(response.data)
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
      <Box sx={{ alignItems: "center", width: "100%", pt: 12 }} className="container">

        <Box >
          <h1>{name}</h1>
          <p>Frequency: {freq}</p>
          <p>Last visit: {lastVisit}</p>
          <p>location ID: {id}</p>
          {/* <p>Last visit: {moment(lastVisit).format('MMMM Do, YYYY')}</p> */}
        </Box>
        <Box>
          <Button onClick={e => onSubmit(e)}>Update Last Visit</Button>
          <Link to="/map">
            <Button>Go back to Map</Button>
          </Link>
        </Box>
      </Box >
    </Box >

  );
}

export default LocationPage;
