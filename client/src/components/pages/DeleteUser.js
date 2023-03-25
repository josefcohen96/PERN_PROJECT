import React, { useState } from "react";
import { useFormik } from 'formik';
import axios from "axios"
import Navbar from "../NavBar/NavBar";
import {
    Box,
    Button,
    FormGroup,
    Input,
} from "@mui/material";

const DeleteUser = () => {

    const [userData, setUserData] = useState({});

    const formik = useFormik({
        initialValues: { id: '' },
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            try {
                if (window.confirm('Are you sure you want to delete this user?')) {
                    var url = values.id.toString()
                    const response = await axios.delete('http://localhost:5000/users/' + url)
                    if (response.status === 200) {
                        alert("User deleted Successfully!");
                    }
                }
            } catch (err) {
                setErrors({ id: 'User not found or you do not have the permission' });
                console.error(err.message)
            }
            setSubmitting(false);
        },
        validate: values => {
            const errors = {};
            if (!values.id) {
                errors.id = 'Id is required';
            } else if (isNaN(values.id)) {
                errors.id = 'Id must be a number';
            }
            return errors;
        },
    });

    const showUser = async e => {
        e.preventDefault();
        try {
            var url = formik.values.id.toString()
            const response = await axios.get('http://localhost:5000/users/' + url)
            setUserData(response.data.rows[0]);
            console.log(userData)

        } catch (err) {
            alert('User not found, Please verify the ID')
        }
    }
    return (
        <Box>
            <Navbar />
            <Box sx={{ alignItems: "center", width: "100%", pt: 12 }} className="container">
                <Box className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Enter user detalis</h2>
                    <FormGroup onSubmit={formik.handleSubmit}>
                        <Box className="form-group">
                            <Input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="id"
                                name="id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.id}
                                {...(formik.errors.id && { 'aria-describedby': 'id-error' })}
                            />
                            <Box className="text-danger" id="id-error">
                                {formik.errors.id}
                            </Box>
                        </Box>
                        <Button className="btn btn-secondary btn-block" onClick={showUser} disabled={formik.isSubmitting}>Show user details</Button>
                        <Button className="btn btn-secondary btn-block" disabled={formik.isSubmitting}>Delete User</Button>
                        <Box>
                            {userData &&
                                <Box>
                                    <p>First Name: {userData.first_name}</p>
                                    <p>Last Name: {userData.last_name}</p>
                                    <p>Email: {userData.email}</p>
                                    <p>Phone Number: {userData.phone_number}</p>
                                    <p>permission: {userData.permission}</p>
                                    <p>work area: {userData.work_area}</p>
                                    <p>id: {userData.id}</p>
                                    <p>admin: {userData.is_admin ? "true" :  "false"}</p>
                                    <p>user name: {userData.user_name}</p>
                                </Box>
                            }
                        </Box>
                    </FormGroup>
                </Box>
            </Box>
        </Box>
    );
}
export default DeleteUser;  
