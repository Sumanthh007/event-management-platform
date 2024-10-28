const express = require('express');
const router = express.Router();
const eventController = require('./eventController'); 


router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById); 
router.post('/events', eventController.createEvent)
router.put('/events/:id', eventController.updateEvent); 
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;

