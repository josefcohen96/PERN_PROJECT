import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS

function Login() {
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, password }),

      });
      console.log(user_name, password)
      console.log(JSON.stringify({ user_name, password }))
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
  );
}

export default Login;