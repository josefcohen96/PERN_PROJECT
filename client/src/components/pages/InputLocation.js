import React, { useState } from "react";
import Navbar from "../NavBar/NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Box,

} from "@mui/material";
const InputLocation = () => {

    const [location, setLocation] = useState({
        id: "",
        name: "",
        coordinates: "",
        lastVisit: new Date()
    });

    const onInputChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        setLocation({ ...location, [name]: value });
    };

    const onDateChange = date => {
        setLocation({ ...location, lastVisit: date });
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const { id, name, coordinates, lastVisit } = location;
            const formattedDate = new Date(lastVisit).toISOString().split("T")[0];
            const response = await fetch("http://localhost:5000/locations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, name, coordinates, lastvisit: formattedDate })
            });
            console.log(response)
            setLocation({
                id: "",
                name: "",
                lastVisit: "",
                coordinates: "",
            });
        } catch (err) {
            console.error(err.message)
        }
    };
    return (
        <Box >
            <Navbar />

            <div className="row">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h3 className="text-center mb-4">Add Location</h3>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter id"
                                    name="id"
                                    value={location.id}
                                    onChange={e => onInputChange(e)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter site name"
                                name="name"
                                value={location.name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter coordinates"
                                name="coordinates"
                                value={location.coordinates}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Last Visit:
                                <br />
                                <DatePicker
                                    selected={location.lastVisit}
                                    onChange={onDateChange}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </label>
                        </div>
                        <button className="btn btn-secondary btn-block" >Create Location</button>
                    </form>
                </div>
            </div >
        </Box>
    );
};

export default InputLocation;  