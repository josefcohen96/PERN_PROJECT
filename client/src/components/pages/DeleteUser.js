// import React, { useState } from "react";
// import axios from "axios"
// // import TextBox from "./TextBox"
// const DeleteUser = () => {

//     const [user, setUser] = useState({ id: "" });
//     const [userData, setUserData] = useState({});

//     const onInputChange = e => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     }

//     const showUser = async e => {
//         e.preventDefault();
//         try {
//             var url = user.id.toString()
//             const response = await axios.get('http://localhost:5000/users/' + url)
//             setUserData(response.data.rows[0]);
//         } catch (err) {
//             console.error(err.message)
//         }
//     }

//     const FindUser = async e => {
//         e.preventDefault();
//         try {
//             var url = user.id.toString()
//             const response = await axios.get('http://localhost:5000/user/' + url)
//             console.log(response.data.rows[0])
//         }
//         catch (err) {
//             console.error(err.message)
//         }
//     }

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             var url = user.id.toString()
//             // alert('http://localhost:5000/users/' + url)
//             axios.delete('http://localhost:5000/users/' + url, {
//                 data: {
//                     resourceId: 123
//                 }
//             })
//                 .then(function (response) {
//                     console.log(response);
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                 });
//             // const response = await fetch('http://localhost:5000/users/'+url, {
//             //     method: "DELETE ",  
//             // }).catch(e => console.log(e));
//             // console.log(user)
//             // console.log(JSON.stringify(user))
//             // console.log(response)
//         } catch (err) {
//             console.error(err.message)
//         }
//     };
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
//                     <h2 className="text-center mb-4">Enter user detalis</h2>
//                     <form onSubmit={e => onSubmit(e)}>
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 className="form-control form-control-lg"
//                                 placeholder="id"
//                                 name="id"
//                                 onChange={e => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="form-group">
//                         </div>
//                         <button className="btn btn-secondary btn-block" onClick={showUser} disabled={user.id === ""}>Show user details</button>
//                         <button className="btn btn-secondary btn-block" onClick={FindUser}>Delete User</button>
//                         <div>
//                             <p>First Name: {userData.first_name}</p>
//                             <p>Last Name: {userData.last_name}</p>
//                             <p>Email: {userData.email}</p>
//                             <p>Phone Number: {userData.phone_number}</p>
//                             <p>permission: {userData.permission}</p>
//                             <p>work area: {userData.work_area}</p>
//                             <p>speciality_product: {userData.speciality_product}</p>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DeleteUser;  
import React, { useState } from "react";
import { useFormik } from 'formik';
import axios from "axios"

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
        } catch (err) {
            alert('User not found, Please verify the ID')
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Enter user detalis</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="id"
                                name="id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.id}
                                {...(formik.errors.id && { 'aria-describedby': 'id-error' })}
                            />
                            <div className="text-danger" id="id-error">
                                {formik.errors.id}
                            </div>
                        </div>
                        <button className="btn btn-secondary btn-block" onClick={showUser} disabled={formik.isSubmitting}>Show user details</button>
                        <button className="btn btn-secondary btn-block" disabled={formik.isSubmitting}>Delete User</button>
                        <div>
                            {userData &&
                                <div>
                                    <p>First Name: {userData.first_name}</p>
                                    <p>Last Name: {userData.last_name}</p>
                                    <p>Email: {userData.email}</p>
                                    <p>Phone Number: {userData.phone_number}</p>
                                    <p>permission: {userData.permission}</p>
                                    <p>work area: {userData.work_area}</p>
                                    <p>speciality_product: {userData.speciality_product}</p>
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default DeleteUser;  
