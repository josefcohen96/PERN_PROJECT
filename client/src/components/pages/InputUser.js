import {
  Box,
  Button,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

import React, { useState } from "react";
import Navbar from "../NavBar/NavBar";


const InputUser = () =>  {
  const [isAdmin, setIsAdmin] = useState({ isAdmin: false });

  const [user, setUser] = useState({
    first_name: "jhon",
    last_name: "",
    phone_number: "",
    id: "",
    email: "example@gmail.com",
    permission: "",
    work_area: "",
    product_id: "",
    is_admin: "",
    user_name: "",
    is_admin: false,
  });

  const onInputChange = (e) => {
    e.preventDefault();
    setIsAdmin(e.target.value);
    user.is_admin = e.target.value

    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/InputUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      console.log(user);
      console.log(JSON.stringify(user));
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };
  const isFormValid = user.first_name && user.email && user.id && user.last_name && user.permission && user.phone_number && user.product_id && user.user_name && user.work_area;

  return (
    <Box >
      <Navbar />
      <Box sx={{ alignItems: "center", width: "100%" }} className="container">

        <Typography sx={{ textAlign: "center" }} variant="h3">
          Add User
        </Typography>
        <FormControl
          sx={{ gap: 2, width: "80%", pb: 4, pl: 25 }}
        >
          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="text"
              sx={{ width: "100%" }}
              placeholder="Enter first name"
              name="first_name"
              value={user.first_name}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >
          <FormControl sx={{ width: '100%' }}>
            <TextField
              type="text"
              placeholder="Enter last name"
              name="last_name"
              value={user.last_name}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >
          <FormControl sx={{ width: "100%" }}>
            <TextField

              type="text"
              placeholder="Enter E-mail"
              name="email"
              value={user.email}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >
          <FormControl sx={{ width: "100%" }}>
            <TextField

              type="text"
              placeholder="Enter phone number"
              name="phone_number"
              value={user.phone_number}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >
          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="text"
              placeholder="Enter permission"
              name="permission"
              value={user.permission}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >
          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="text"
              placeholder="Enter work_area"
              name="work_area"
              value={user.work_area}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >
          <FormControl sx={{ width: "100%" }}>
            <TextField
              required
              type="text"
              placeholder="Enter id"
              name="id"
              value={user.id}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >

          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="text"
              placeholder="Enter product id"
              name="product_id"
              value={user.product_id}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >
          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="text"
              helperText="user name"
              placeholder="Enter user name"
              name="user_name"
              value={user.user_name}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl >
          <Box>
            <FormControl sx={{ width: "100%" }}>

              <InputLabel id="demo-simple-select-label">Is admin?</InputLabel>
              <Select
                label="is admin?"
                value={isAdmin}
                onChange={(e) => onInputChange(e)}
                key={true}
                defaultValue={false}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl >
          </Box>
          <Button onClick={(e) => onSubmit(e)}
            disabled={!isFormValid} sx={{}}>Create User</Button>
        </FormControl >
      </Box>
    </Box >
  );
};

export default InputUser;