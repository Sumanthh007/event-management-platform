import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const hardcodedUsername = 'Sumanth_GDG';
    const hardcodedPassword = 'password123';

    const handleLogin = (e) => {
        e.preventDefault();
        
        
        if (username === hardcodedUsername && password === hardcodedPassword) {
            alert('Login successful!');
            navigate('/events-list'); 
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Login</h1>
            <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: 'blue', cursor: 'pointer' }}>Sign up</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
