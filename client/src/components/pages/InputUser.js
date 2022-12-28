import React, { useState } from "react";
// import TextBox from "./TextBox"
const InputUser = () => {


    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        id: "",
        email: "example@gmail.com",
        permission: "",
        work_area: "",
        speciality_product: "",
    });
    const [errors, setErrors] = useState({});

    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const onInputChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        if (name === 'email' && !validateEmail(value)) {
            setErrors({ ...errors, email: 'Please enter a valid email address' });

        } else {
            setErrors({ ...errors, email: '' });
        }

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
            <div className="row">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h3 className="text-center mb-4">Add User</h3>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter first name"
                                name="first_name"
                                value={user.first_name}
                                onChange={e => onInputChange(e)}
                            />
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
                            {errors.email && <p className="error">{errors.email}</p>}

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
                                placeholder="Enter id"
                                name="id"
                                value={user.id}
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
                        <button className="btn btn-secondary btn-block" disabled={!!errors.email} >Create User</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputUser;  