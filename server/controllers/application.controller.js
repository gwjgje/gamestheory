const ApplicationModel = require("../models/application.model");
const EventModel = require("../models/event.model");


/**
 * GET ALL APPLICATIONS FOR SPECIFIC USER
 * */
const allApplicationsForSpecificUser = async (req, res) => {
     const userId = req.headers.userId;
     let filterObj = { user: userId };
     if (req.query.status) filterObj.status = req.query.status;

     try {
          const applications = await ApplicationModel.find(filterObj).populate({
               path: 'event'
          });
          res.status(200).send({ message: 'success', data: applications });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


/**
 * APPLY FOR SPECIFIC EVENT
 * */
const applyForSpecificEvent = async (req, res) => {
     const eventId = req.params.eventId;
     const userId = req.headers.userId;

     if (!eventId || !userId) {
          res.status(400).send({ message: 'Please Provide proper information to apply in a event' })
          return;
     };

     try {
          const event = await EventModel.findById(eventId);
          if (event.limit === event.participants.length) {
               res.status(200).send({ message: 'Sorry, Events participant limit reached!' })
          } else {
               const applications = await ApplicationModel.find({ event: eventId, user: userId });
               console.log('applications:', applications)

               if (applications.length) {
                    res.status(400).send({ message: `Your application is already in ${applications[0].status} status` })
               } else {
                    const application = new ApplicationModel({ event: eventId, user: userId });
                    await application.save();
                    res.status(201).send({ message: 'Applied successfully' });
               }
          }
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


/**
 * GET ALL THE APPLIED USERS FOR SPECIFIC EVENT
 * * PENDING APPLICATIONS
 * */
const appliedUsersForSpecificEvent = async (req, res) => {
     const eventId = req.params.eventId;
     try {
          const pendingParticipants = await ApplicationModel.find({ status: 'pending', event: eventId }).select(['user']).populate('user', '-password');
          res.status(200).send({ message: 'success', data: pendingParticipants });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


module.exports = { allApplicationsForSpecificUser, appliedUsersForSpecificEvent, applyForSpecificEvent };