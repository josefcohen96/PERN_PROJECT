import React, { useState } from "react";
import Navbar from "../NavBar/NavBar";
import {
    Box,
    Button,
    FormGroup,
    Input,
} from "@mui/material";
import { api } from "../../NewApi";
const EditUser = () => {
    const token = localStorage.getItem('token');

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        user_id: '',
        user_name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        area: '',
        role: '',
        company_id: '',
    });

    const { first_name, last_name, user_id, user_name, email,
        password,
        phone,
        address,
        area,
        role,
        company_id, } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onSubmit = async e => {
        e.preventDefault();
        try {
            api('users/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...user,
                })
            })

            console.log(user)
        } catch (err) {
            console.error(err.message)
        }
    };
    return (
        <Box >
            <Navbar />
            <Box sx={{ alignItems: "center", width: "100%", pt: 12 }} className="container">
                <Box className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h3 className="text-center mb-4">Enter user details</h3>
                    <FormGroup>
                        <Box className="form-group">
                            <Input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="user id"
                                name="user_id"
                                value={user_id}
                                onChange={e => onInputChange(e)}
                            />
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
                        </Box>
                        <Box className="form-group">
                        </Box>
                        <Button onClick={e => onSubmit(e)} className="btn btn-secondary btn-block">Edit User</Button>
                    </FormGroup>
                </Box>
            </Box>
        </Box>
    );
};

export default EditUser;  