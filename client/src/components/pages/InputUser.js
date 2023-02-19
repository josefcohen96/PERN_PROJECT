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
    const onInputChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const onSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/InputUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
            console.log(user)
            console.log(JSON.stringify(user))
            console.log(response)
        } catch (err) {
            console.error(err.message)
        }
    };
    return (
        <div className="container">
            <Navbar />

            <div className="row">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h3 className="text-center mb-4">Add User</h3>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label>

                                <input
                                    type="text"

                                    className="form-control form-control-lg"
                                    placeholder="Enter first name"
                                    name="first_name"
                                    value={user.first_name}
                                    onChange={e => onInputChange(e)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter last name"
                                name="last_name"
                                value={user.last_name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter E-mail"
                                    name="email"
                                    value={user.email}
                                    onChange={e => onInputChange(e)}

                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter phone number"
                                name="phone_number"
                                value={user.phone_number}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter permission"
                                name="permission"
                                value={user.permission}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter work_area"
                                name="work_area"
                                value={user.work_area}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter speciality_product"
                                name="speciality_product"
                                value={user.speciality_product}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                        </div>
                        <button className="btn btn-secondary btn-block" >Create User</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputUser;  