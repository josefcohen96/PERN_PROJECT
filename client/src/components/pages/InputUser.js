import {
  Box,
  Button,
  Typography,
  Input,
} from "@mui/material";

import React, { useState } from "react";
import Navbar from "../NavBar/NavBar";
import { useNavigate } from 'react-router-dom';


const InputUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    {
      first_name: "",
      last_name: "",
      user_name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      area: '',
      role: '',
      company_id: '',
    });

  const onInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const token = localStorage.getItem('token');

  async function addUserFetch() {
    try {
      const response = await fetch(
        'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/addUser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...user,
            location: {
              address_name: address,
              zone_name: area,
              city: 'Holon',
              country: 'Israel',
              latitude: 34.052235,
              longitude: -118.243683,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      console.log(response);
      navigate('/admin');
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  const { first_name, last_name, user_name, email,
    password,
    phone,
    address,
    area,
    role,
    company_id, } = user;
  const onSubmit = async (e) => {
    e.preventDefault();
    addUserFetch()
  };

  return (
    <Box >
      <Navbar />
      <Box sx={{ alignItems: "center", width: "100%" }} className="container">

        <Typography sx={{ textAlign: "center" }} variant="h3">
          Add User
        </Typography>
        <Input
          type="text"
          className="form-control form-control-lg"
          placeholder="user name"
          name="user_name"
          value={user_name}
          onChange={e => onInputChange(e)}
        />
        <Input
          type="text"
          sx={{ width: "100%" }}
          className="form-control form-control-lg"
          placeholder="first name"
          name="first_name"
          value={first_name}
          onChange={e => onInputChange(e)}
        />
        <Input
          type="text"
          className="form-control form-control-lg"
          placeholder="last name"
          name="last_name"
          value={last_name}
          onChange={e => onInputChange(e)}
        />
        <Input
          type="text"
          className="form-control form-control-lg"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => onInputChange(e)}
        />

        <Input
          type="password"
          className="form-control form-control-lg"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onInputChange(e)}
        />

        <Input
          type="text"
          className="form-control form-control-lg"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={e => onInputChange(e)}
        />

        <Input
          type="text"
          className="form-control form-control-lg"
          placeholder="Address"
          name="address"
          value={address}
          onChange={e => onInputChange(e)}
        />

        <Input
          type="text"
          className="form-control form-control-lg"
          placeholder="Area"
          name="area"
          value={area}
          onChange={e => onInputChange(e)}
        />

        <Input
          type="text"
          className="form-control form-control-lg"
          placeholder="Role"
          name="role"
          value={role}
          onChange={e => onInputChange(e)}
        />

        <Input
          type="text"
          className="form-control form-control-lg"
          placeholder="Company ID"
          name="company_id"
          value={company_id}
          onChange={e => onInputChange(e)}
        />
        <Button onClick={(e) => onSubmit(e)}>Create User</Button>
      </Box>
    </Box >
  );
};

export default InputUser;