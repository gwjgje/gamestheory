const express = require('express');
const { getAllEvents, getEventsCreatedBySpecificUser, getSpecificEvent, createEvent, updateEvent, getOptions } = require('../controllers/event.controller');

const eventRouter = express.Router();

eventRouter.get('/options', getOptions) // ? GET ALL FILTER OPTIONS DYNAMICALLY
eventRouter.get('/', getAllEvents) // ? GET ALL EVENTS
eventRouter.get('/myevents', getEventsCreatedBySpecificUser) // ? GET EVENTS CREATED BY SPECIFIC USER
eventRouter.get('/:eventId', getSpecificEvent) // ? GET SPECIFIC EVENT
eventRouter.post('/', createEvent) // ? CREATE EVENT
eventRouter.patch('/:eventId', updateEvent) // ? UPDATE EVENT 


module.exports = eventRouter;
