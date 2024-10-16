const express = require("express");
const { allApplicationsForSpecificUser, appliedUsersForSpecificEvent, applyForSpecificEvent } = require("../controllers/application.controller");

const applicationRouter = express.Router();

applicationRouter.get('/', allApplicationsForSpecificUser) // ? ALL APPLICATIONS FOR SPECIFIC USER
applicationRouter.get('/:eventId', applyForSpecificEvent) // ? APPLY FOR THE EVENT
applicationRouter.get('/applied/:eventId', appliedUsersForSpecificEvent) // ? GET APPLIED PARTICIPANTS FOR SPECIFIC EVENT

module.exports = applicationRouter;