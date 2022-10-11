import { func } from "prop-types";
import React, { Fragment, useState } from "react";

const InputUser = () => {
    const [id, setId] = useState("ID"); // put somting in the "" will put a default value for the window 
    const [phone_number, setPhoneNumber] = useState("phone number"); // put somting in the "" will put a default value for the window 

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { id, phone_number };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response)

        } catch (err) {
            console.error(err.message)

        }
    }
    return (<Fragment>
        <h1 className="text-center mt-5">User List</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input
                type="text"
                className="from-control"
                valueID={id}
                onChange={e => setId(e.target.valueID)} />
            <input
                type="text"
                className="from-control"
                value={phone_number}
                onChange={e => setPhoneNumber(e.target.value)} />
            <button className="btn btn-success" >Add</button>
        </form>
    </Fragment>
    );
};

export default InputUser;  