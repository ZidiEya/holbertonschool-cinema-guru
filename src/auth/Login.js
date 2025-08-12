import React from 'react';
import './auth.css';

function Login({ username, password, setUsername, setPassword, setIsLoggedIn, setUserUsername }) {
    
    const handleSubmit = (event) => {
        event.preventDefault();


        if (username === "Test User" && password === "pass") {
            setIsLoggedIn(true);
            setUserUsername(username);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form' >
            <p>Sign in with your account</p>
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
            <button type="submit" >Sign In</button>
        </form>
    );
}

export default Login;
