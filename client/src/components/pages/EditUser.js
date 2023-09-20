import React, { useState, useEffect } from "react";
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
    const [users, setUsers] = useState([]);
    const user_id = 20
    const [user, setUser] = useState({
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

    const { first_name, last_name, user_name, email,
        password,
        phone,
        address,
        area,
        role,
        company_id, } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onChange = key => value => {
        setUser({ ...user, [key]: value });
    }


    async function getUsers() {
        try {
            const response = await fetch(
                'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/getUsers?OFFSET=0&LIMIT=100',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            return data.answer;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    useEffect(() => {
        getUsers()
            .then((data) => {
                setUsers(data);
                console.log(data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (users.length) {
            const editedUser = users.find(
                (user) => user.user_id === parseInt(user_id)
            );
            console.log(editedUser);
            onChange('user_name')(editedUser.user_name);
            onChange('password')(editedUser.password);
            onChange('company_id')(editedUser.company_id);
            onChange('first_name')(editedUser.first_name);
            onChange('last_name')(editedUser.last_name);
            onChange('email')(editedUser.email);
            onChange('phone')(editedUser.phone);
            onChange('role')(editedUser.role);
            onChange('address_name')(editedUser.address_name);
            onChange('zone_name')(editedUser.zone_name);
        }
    }, [users]);
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