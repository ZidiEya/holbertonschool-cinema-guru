import React from 'react';
import './auth.css';

function Register({ username, password, setUsername, setPassword, setIsLoggedIn, setUserUsername }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        setIsLoggedIn(true);
        setUserUsername(username);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Create new account</p>
            <input
                type="text"
                className="underline-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username:"
                required
            />
            <input
                type="password"
                className="underline-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password:"
                required
            />
            <button type="submit">Sign up</button>
        </form>
    );
}

export default Register;
