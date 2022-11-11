import React, { useState } from "react";
// import TextBox from "./TextBox"
const InputUser = () => {
    // const [id, setId] = useState();  // It declares a “state variable”  || 
    // console.log(id)
    //The only argument to the useState() Hook is the initial state 
    //|| return  the current state and a function that updates it
    // const [email, setEmail] = useState("");
    // console.log(email)
    // const [firstName, setFirstName] = useState("");
    // console.log(firstName)
    // const [lastName, setLastName] = useState("");
    // console.log(lastName)
    // const [phoneNumber, setPhoneNumber] = useState("");
    // console.log(phoneNumber)
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        id: "",
        email: ""
    });

    const { first_name, last_name, email, phone_number, id } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/todos", {
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
                    <h2 className="text-center mb-4">Edit A Product</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter first name"
                                name="first_name"
                                value={first_name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter last name"
                                name="last_name"
                                value={last_name}
                                onChange={e => onInputChange(e)}
                            />
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter E-mail"
                                name="email"
                                value={email}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter phone number"
                                name="phone_number"
                                value={phone_number}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter id"
                                name="id"
                                value={id}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">

                        </div>
                        <button className="btn btn-secondary btn-block">Update User</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputUser;  