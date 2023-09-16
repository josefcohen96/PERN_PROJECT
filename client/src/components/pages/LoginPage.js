import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS
import { api } from '../../NewApi';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  console.log(navigate);
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const requestBody = {
        user_name: user_name.trim(),
        password: password.trim(),
        company_id: parseInt(companyId.trim()),
      };
      api('users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then((res) => {
        console.log(res);

        if (res.ok) {
          onLogin();
          localStorage.setItem('token', res.answer.token);
          localStorage.setItem('role', res.answer.role);
          navigate('/works');
        } else {
          alert(res.answer + ". Please try again");
        }
      })

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
        <label>
          Company ID:
          <input
            className="login-input"
            type="text"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
          />
        </label>
        <br />
        <button className="login-button" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
