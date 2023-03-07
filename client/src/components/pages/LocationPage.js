import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import './LocationPage.css';

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

  if (!location) {
    return <div>Loading...</div>;
  }

  const { name, freq, lastVisit, description, image } = location;

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <img src={image} alt={name} className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h1 className="display-4 mb-4">{name}</h1>
          <Badge bg="primary" className="mb-2">
            {freq}
          </Badge>
          <p className="fs-5 text-muted mb-4">
            Last visit: {new Date(lastVisit).toLocaleDateString()}
          </p>
          <p className="fs-4 mb-4">{description}</p>
          <Button variant="outline-primary">Edit</Button>{" "}
          <Button variant="danger">Delete</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LocationPage;
