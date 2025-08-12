import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import Login from './Login';
import Register from './Register';

function Authentication({ setIsLoggedIn, setUserUsername }) {
    const [_switch, setSwitch] = useState(true); // true for Login, false for Register
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = _switch ? '/api/auth/login' : '/api/auth/register';
            const response = await axios.post(url, { username, password });

            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken); 
            setUserUsername(username); 
            setIsLoggedIn(true); 
        } catch (error) {
            console.error('Authentication failed:', error.response.data.message);
        }
    }
    return (
        <div className="auth-container">
            <div className="auth-buttons">
                <button onClick={() => setSwitch(true)}>Sign In</button>
                <button onClick={() => setSwitch(false)}>Sign Up</button>
            </div>

            {_switch ? (
                <Login
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserUsername={setUserUsername}
                />
            ) : (
                <Register
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserUsername={setUserUsername}
                />
            )}
        </div>
    );
}

export default Authentication;
