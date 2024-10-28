import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisteredEvents = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch registered events from the server
    const fetchRegisteredEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/registered-events'); 
            setRegistrations(response.data);
        } catch (err) {
            setError('Error fetching registered events');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegisteredEvents();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Registered Events</h1>
            {registrations.length > 0 ? (
                registrations.map((registration) => (
                    <div key={registration._id} style={{ border: '1px solid #ccc', borderRadius: '5px', margin: '10px 0', padding: '10px', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)' }}>
                        <h2>{registration.event.title}</h2> {/* Assuming registration object has an event property */}
                        <p><strong>Name:</strong> {registration.name}</p>
                        <p><strong>Age:</strong> {registration.age}</p>
                        <p><strong>Phone:</strong> {registration.phone}</p>
                    </div>
                ))
            ) : (
                <p>No registered events available</p>
            )}
        </div>
    );
};

export default RegisteredEvents;