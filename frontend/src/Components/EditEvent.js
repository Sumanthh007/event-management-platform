import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/edit-event.css';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => { 
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        image: ''
    });
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(response.data);
                setImagePreview(response.data.image);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEvent();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/events/${id}`, event);
            alert('Event updated successfully!');
            navigate('/manage-events');
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update the event. Please try again.');
        }
    };

   
    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setEvent({ ...event, image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

  
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setEvent({ ...event, image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-event-container">
            <h1>Edit Event</h1>
            <form onSubmit={handleUpdate} className="edit-event-form">
                <input 
                    type="text" 
                    name="title" 
                    value={event.title} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Title" 
                />
                <textarea 
                    name="description" 
                    value={event.description} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Description" 
                />
                <input 
                    type="datetime-local" 
                    name="date" 
                    value={event.date} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="location" 
                    value={event.location} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Location" 
                />

             
                <div 
                    className="image-drop-area" 
                    onDrop={handleImageDrop} 
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    {imagePreview ? (
                        <img src={imagePreview} alt="Event Preview" className="image-preview" />
                    ) : (
                        <p>Drag & Drop an Image Here or Click to Select</p>
                    )}
                </div>

           
                <input 
                    type="file" 
                    id="file-input" 
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    onChange={handleImageSelect} 
                />
                
                <input 
                    type="text" 
                    name="image" 
                    value={event.image} 
                    onChange={handleInputChange} 
                    placeholder="Image URL" 
                />
                
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;
