import React, { useState } from 'react';
import '../styles/registrationform.css';
import { useNavigate, useLocation } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedEvent = location.state?.event;

    const [registrationData, setRegistrationData] = useState({ name: '', age: '', phone: '', email: '' });

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        alert(`Successfully registered for ${selectedEvent.title}`);
        navigate('/events-list'); 
    };

    const handleCancel = () => {
        navigate('/events-list'); 
    };

    return (
        <div className="registration-container">
            <h2>Register for {selectedEvent?.title}</h2>
            <form onSubmit={handleRegistrationSubmit} className="form">
                <input
                    type="text"
                    placeholder="Name"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={registrationData.age}
                    onChange={(e) => setRegistrationData({ ...registrationData, age: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                    required
                />
                <input
                    type='email'
                    placeholder="Email"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                    required
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
