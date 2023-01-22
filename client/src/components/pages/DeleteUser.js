import React, { useState } from "react";
import axios from "axios"
// import TextBox from "./TextBox"
const DeleteUser = () => {

    const [user, setUser] = useState({ id: "" });


    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const showUser = async e => {
        e.preventDefault();
        try {
            var url = user.id.toString()
            const response = await axios.get('http://localhost:5000/users/' + url)
            console.log(response.data)
        } catch (err) {
            console.error(err.message)
        }
    }
    const onSubmit = async e => {
        e.preventDefault();
        try {
            var url = user.id.toString()
            alert('http://localhost:5000/users/' + url)
            axios.delete('http://localhost:5000/users/' + url, {
                data: {
                    resourceId: 123
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // const response = await fetch('http://localhost:5000/users/'+url, {
            //     method: "DELETE ",  
            // }).catch(e => console.log(e));
            // console.log(user)
            // console.log(JSON.stringify(user))
            // console.log(response)
        } catch (err) {
            console.error(err.message)
        }
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Enter user detalis</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="id"
                                name="id"
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                        </div>
                        <button className="btn btn-secondary btn-block" onClick={showUser} disabled={user.id === ""}>Show user details</button>                        <button className="btn btn-secondary btn-block">Delete User</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;  