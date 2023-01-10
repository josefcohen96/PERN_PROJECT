// import React from 'react'
// import '../../App.css'

// const SignInPage = () => {

//     return (
//         <div className="text-center m-5-auto">
//             <h2>Log in </h2>
//             <form action="/login" method="post">
//                 <p>
//                     <form action="/login" method="post">
//                         <label>Username:</label>
//                         <input type="text" name="user_name" />
//                         <br />
//                         <label>Password:</label>
//                         <input type="password" name="password" />
//                         <br />
//                         <input type="button" value="Log in"/>
//                     </form>
//                 </p>
//             </form>
//         </div>
//     )
// }
// export default SignInPage;


import React, { useEffect, useState } from 'react';
import './LoginPage.css'; // Import the CSS

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/Works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),

      });
      console.log(username, password)
      console.log(JSON.stringify({ username, password }))
      console.log(response)
    } catch (err) {
      console.error(err.message)
    }

  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          className="login-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button className="login-button" type="submit">Log In</button>
    </form>
  );
}

export default Login;