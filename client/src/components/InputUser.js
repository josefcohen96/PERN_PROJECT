import React, { Fragment, useState } from "react";
import TextBox from "./TextBox"
const InputUser = () => {
    const [id, setId] = useState("id");  // It declares a “state variable”  || 
    //The only argument to the useState() Hook is the initial state 
    //|| return  the current state and a function that updates it
    const [email, setEmail] = useState("email");
    const [firstName, setFirstName] = useState("firstName");
    const [lastName, setLastName] = useState("lastName");
    const [phoneNumber, setPhoneNumber] = useState("phoneNumber");
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { firstName, lastName,  email,  phoneNumber, id };
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
    return (
        <Fragment>
            <h1 className="text-center mt-5">User List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                {/* input is a searching box  */}
                {/* <input 
                type="text"
                className="from-control"
                value={id}
                onChange={e => setId(e.target.value)} /> */}
                <TextBox value={id} onChange={e => setId(e.target.value)}> </TextBox>
                <TextBox value={email} onChange={e => setEmail(e.target.value)}></TextBox>
                <TextBox value={firstName} onChange={e => setFirstName(e.target.value)}></TextBox>
                <TextBox value={lastName} onChange={e => setLastName(e.target.value)}></TextBox>
                <TextBox value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></TextBox>
                <button className="btn btn-success" >Add</button>
            </form>
        </Fragment>
    );
};

export default InputUser;  