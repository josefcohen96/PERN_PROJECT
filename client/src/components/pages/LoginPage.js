import React, { useState } from 'react';


import '../../App.css'

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const validateUser = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5000/LoginPage/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const handleLogin = async () => {
        const isValid = await validateUser(username, password);
        if (isValid) {
            // Navigate to the home page
        } else {
            setError('Invalid username or password');
        }
    };
    return (
        <form>
            {error && <p>{error}</p>}
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>
                Login
            </button>
        </form>
    );
};
export default SignInPage;
