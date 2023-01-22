import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS

function Login() {
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("hello")
    try {
      console.log("hello2")
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, password }),
      });
      console.log(response)
      if (!response.ok) {
        alert("Incorrect user name or password. Please try again");
        return;
      }
      // If the login is successful, you can redirect the user to the home page or any other page
      // for example:
      window.location.href = '/works';
    } catch (err) {
      console.error(err.message)
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            className="login-input"
            type="text"
            value={user_name}
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
    </div>
  );
}

export default Login;
