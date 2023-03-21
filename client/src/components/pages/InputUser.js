import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../NavBar/NavBar";

const InputUser = () => {
  const [user, setUser] = useState({
    first_name: "yosef",
    last_name: "",
    phone_number: "",
    id: "",
    email: "example@gmail.com",
    permission: "",
    work_area: "",
    speciality_product: "",
  });
  const onInputChange = (e) => {
    e.preventDefault();

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
  return (
    <Box >

      <Navbar />
    <Box sx={{ alignItems: "center", width: "100%",pt:12 }} className="container">

      <Box sx={{ alignItems: "center", width: "100%" }}>
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Add User
        </Typography>
        <FormControl
          sx={{ gap: 2, width: "60%",}}
          onSubmit={(e) => onSubmit(e)}
          >
          <FormGroup sx={{ width: "100%" }}>
            <Input
              type="text"
              sx={{ width: "100%" }}
              className="form-control form-control-lg"
              placeholder="Enter first name"
              name="first_name"
              value={user.first_name}
              onChange={(e) => onInputChange(e)}
              />
          </FormGroup>
          <FormGroup sx={{width:'100%'}}>
            <Box className="form-group">
              <Input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter last name"
                name="last_name"
                value={user.last_name}
                onChange={(e) => onInputChange(e)}
                />
            </Box>
          </FormGroup>
          <FormGroup sx={{ width: "100%" }}>
            <Input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter E-mail"
              name="email"
              value={user.email}
              onChange={(e) => onInputChange(e)}
              />
          </FormGroup>
          <FormGroup sx={{ width: "100%" }}>
            <Input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter phone number"
              name="phone_number"
              value={user.phone_number}
              onChange={(e) => onInputChange(e)}
              />
          </FormGroup>
          <FormGroup sx={{ width: "100%" }}>
            <Input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter permission"
              name="permission"
              value={user.permission}
              onChange={(e) => onInputChange(e)}
              />
          </FormGroup>
          <FormGroup sx={{ width: "100%" }}>
            <Input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter work_area"
              name="work_area"
              value={user.work_area}
              onChange={(e) => onInputChange(e)}
              />
          </FormGroup>
          <FormGroup sx={{ width: "100%" }}>
            <Input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter speciality_product"
              name="speciality_product"
              value={user.speciality_product}
              onChange={(e) => onInputChange(e)}
              />
          </FormGroup>

          <Button sx={{}}>Create User</Button>
        </FormControl>
      </Box>
    </Box>
              </Box>
  );
};

export default InputUser;
