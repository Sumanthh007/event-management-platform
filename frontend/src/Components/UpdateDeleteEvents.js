import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/edit.css';
import { useNavigate } from 'react-router-dom';

const UpdateDeleteEvents = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                if (response.status === 200) {
                    setEvents(response.data);
                } else {
                    console.error("Failed to fetch events. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/events/${id}`);
                if (response.status === 200) {
                    setEvents(events.filter(event => event._id !== id));
                    alert(response.data.message || 'Event deleted successfully!');
                } else {
                    alert('Failed to delete the event. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete the event. Please try again.');
            }
        }
    };

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="update-delete-container">
            <button className="create-event-btn" onClick={() => navigate('/manage-events/create')}>
                Create New Event
            </button>


            <button 
                className="events-list-btn" 
                onClick={() => navigate('/events-list')} 
                style={{ position: 'absolute', top: '20px', right: '20px' }}
            >
                Events List
            </button>

            <h1>Manage Events</h1>

            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>

            <div className="event-cards-wrapper">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div key={event._id} className="event-card">
                            <h2>{event.title}</h2>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            {event.image && (
                                <img src={event.image} alt={event.title} className="event-image" />
                            )}
                            <button className="edit-btn" onClick={() => navigate(`/manage-events/edit/${event._id}`)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(event._id)}>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-events">No events available</p>
                )}
            </div>
        </div>
    );
};

export default UpdateDeleteEvents;
