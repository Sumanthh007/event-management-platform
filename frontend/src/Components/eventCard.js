import React from 'react';
import { Link } from 'react-router-dom';

const eventCard = ({ event }) => (
    <div className="event-card">
        <img src={event.image} alt={event.title} />
        <h3>{event.title}</h3>
        <p>{event.location}</p>
        <p>{new Date(event.date).toLocaleString()}</p>
        <Link to={`/events/${event._id}`}>View Details</Link>
    </div>
);

export default eventCard;
