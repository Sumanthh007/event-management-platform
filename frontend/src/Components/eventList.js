import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/event-list.css';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const handleRegisterClick = (event) => {
        navigate('/register', { state: { event } });
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="main-container">
            <h1>Event List</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search events by title..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="search-input"
                />
            </div>
            <button className="manage-events-btn" onClick={() => navigate('/manage-events')}>Go to Manage Events</button>
            {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                    <div key={event._id} className="event-card">
                        <h2>{event.title}</h2>
                        <p><strong>Description:</strong> {event.description}</p>
                        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        {event.image && <img src={event.image} alt={event.title} />}
                        <button onClick={() => handleRegisterClick(event)}>Register Now</button>
                    </div>
                ))
            ) : (
                <p className="no-events">No events available</p>
            )}
        </div>
    );
};

export default EventList;
