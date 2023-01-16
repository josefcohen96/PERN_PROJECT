import React, { useState } from "react";

const EditUser = () => {

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
    });

    const { first_name, last_name} = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/EditUser", {
                method: "put",
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
                    <h3 className="text-center mb-4">Enter user details</h3>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="first name"
                                name="first_name"
                                value={first_name}
                                onChange={e => onInputChange(e)}
                            />
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="last name"
                                name="last_name"
                                value={last_name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                        </div>
                        <button className="btn btn-secondary btn-block">Edit User</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;  