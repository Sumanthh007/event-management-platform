import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/newevent.css'; 

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEvent = { title, description, date, location, image };
            await axios.post('http://localhost:5000/api/events', newEvent);
            alert('Event created successfully!');
            navigate('/manage-events');
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setImage('');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event. Please try again.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => setImage(event.target.result);
            } else {
                alert("Please upload an image file.");
            }
        }
    };

    const handleClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => setImage(event.target.result);
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    return (
        <div className="create-event-container">
            <h1>Create New Event</h1>
            <form onSubmit={handleSubmit} className="create-event-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className="form-input"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="form-textarea"
                />
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    required
                    className="form-input"
                />

                <div
                    className={`drag-drop-zone ${dragActive ? 'drag-over' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick} // Open file selector on click
                    style={{ cursor: 'pointer' }} // Change cursor to pointer
                >
                    {image ? (
                        <img src={image} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '4px' }} />
                    ) : (
                        "Drag & Drop to Upload Image or Click to Select"
                    )}
                </div>

                <button type="submit" className="submit-button">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
