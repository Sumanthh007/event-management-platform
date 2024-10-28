const express = require('express');
const Registration = require('./Registration');
const router = express.Router();


router.get('/registered-events', async (req, res) => {
    try {
        const registrations = await Registration.find().populate('eventId');
        

        console.log("Fetched registrations:", registrations);
        

        if (registrations.length === 0) {
            console.log("No registrations found.");
            return res.status(404).json({ message: 'No registered events found' });
        }

        res.json(registrations);
    } catch (error) {

        console.error('Error fetching registered events:', error.message);
        res.status(500).json({ message: 'Error fetching registered events' });
    }
});


router.post('/register', async (req, res) => {
    const { name, age, phone, eventId } = req.body;

    const newRegistration = new Registration({
        name,
        age,
        phone,
        eventId
    });

    try {
        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);
    } catch (error) {
        console.error('Error registering for event:', error.message);
        res.status(500).json({ message: 'Error registering for event' });
    }
});

module.exports = router;
