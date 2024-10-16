const EventModel = require('../models/event.model');
const ApplicationModel = require('../models/application.model');


/**
 * GET ALL THE FILTER OPTIONS DYNAMICALLY FOR COUNTRIES & STATES
 * */
const getOptions = async (req, res) => {
     try {
          const countries = await EventModel.aggregate([{ $group: { _id: null, countries: { $addToSet: '$country' } } }]);
          const states = await EventModel.aggregate([{ $group: { _id: null, states: { $addToSet: '$state' } } }]);
          res.status(200).send({ message: 'success', data: { countries: countries[0].countries, states: states[0].states } });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: "Internal serr error!",
               error: error.message
          });
     }
}


/**
 * GET ALL REGESTRABLE EVENTS
 * ----
 * GET ALL REGESTRABLE EVENTS WITH SEARCHING & FILTERING
 * @param {q} q - Search by title or description with this query
 * @param {country}  country - Serach by country with this query
 * @param {state} state - Serach by state with this query
 * */
const getAllEvents = async (req, res) => {
     const filter = {
          state: req.query.state || "",
          country: req.query.country || "",
          search: req.query.q || "",
     };

     // AGGREGATION PIPELINE FOR SEARCHING & FILTERING SIMULTANEOUSLY
     const pipeline = [
          {
               $match: {
                    $and: [
                         { state: { $regex: filter.state, $options: "i" } },
                         { country: { $regex: filter.country, $options: "i" } },
                         {
                              $or: [
                                   { title: { $regex: filter.search, $options: "i" } },
                                   { description: { $regex: filter.search, $options: "i" } },
                              ],
                         },
                    ],
               },
          }
     ]


     try {
          const events = await EventModel.aggregate(pipeline).exec()
          res.status(200).send({ message: 'success', data: events });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
}


/**
 * GET EVENTS WHICH ARE CREATED BY SPECIFIC USER ONLY
 * */
const getEventsCreatedBySpecificUser = async (req, res) => {
     const userId = req.headers.userId;

     try {
          const events = await EventModel.find({ organisedBy: userId }).populate('participants', '-password');
          res.status(200).send({ message: 'success', data: events });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
}


/**
 * GET SPECIFIC EVENT'S DETAILS
 * */
const getSpecificEvent = async (req, res) => {
     const eventId = req.params.eventId;

     try {
          let event = await EventModel.findById(eventId).populate('participants', '-password').populate('organisedBy', '-password').exec();
          res.status(200).send({ message: 'successful', data: event });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
}



/**
 * CREATE EVENT BY PROVIDING THE `EVENT` IN `req.body`
 * */
const createEvent = async (req, res) => {
     const event = req.body;
     const userId = req.headers.userId;

     if (!event) {
          res.status(400).send({ message: "Please provide proper data to create an event" })
          return;
     }

     try {
          const newEvent = new EventModel({ ...event, organisedBy: userId });
          await newEvent.save();
          res.status(201).send({ message: 'Event created successfully.' })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


/**
 * For accepting or rejecting any participant's application 
 * the update object should have 'addParticipant' with => applicant's userId
 * and 'status' as => 'accepted' or 'rejected' as per the need
 * ---
 * * Update object for accepting or rejecting any participant's application
 * @param {addParticipant} addParticipant - applicant's userid
 * @param {status}  status - acceted or rejected
 * */
const updateEvent = async (req, res) => {
     const eventId = req.params.eventId;
     const userId = req.headers.userId;
     const update = req.body;

     try {
          // ONLY THE CREATOR CAN UPDATE THE SPECIFIC EVENT WHICH IS CREATED BY HIM/HER.
          const matchedEvents = await EventModel.find({ _id: eventId, organisedBy: userId })
          if (matchedEvents.length) {
               let updateEvent = matchedEvents[0];
               try {
                    // IF WANT TO ADD PARTICIPANT IN THE EVENT
                    if (update.addParticipant) {
                         // ADDING THE PARTICIPANT IN THE EVENT IF IT'S NOT JOINED YET
                         if (updateEvent.participants.includes(update.addParticipant)) {
                              res.status(400).send({ message: 'Application already accepted' });
                              return;
                         } else {
                              // UPDATE THE APPLICATION STATUS FOR THE USER
                              const applications = await ApplicationModel.find({ user: update.addParticipant, event: eventId });
                              const application = applications[0];

                              if (update.status === 'accepted' && updateEvent.participants.length < updateEvent.limit) {
                                   await EventModel.findByIdAndUpdate(eventId, { participants: [...updateEvent.participants, update.addParticipant] })
                                   application.status = 'accepted';
                              } else application.status = 'rejected';
                              
                              await application.save();
                         }
                    } else {
                         // OTHER TYPE OF UPDATES APPLIED HERE
                         await EventModel.findByIdAndUpdate(eventId, update)
                    }
                    res.status(200).send({ message: 'Event udpated successfully.' })
               } catch (error) {
                    console.log('error:', error)
                    res.status(500).send({
                         message: error.message,
                         error
                    });
               }
          } else {
               res.status(404).send({ message: "Sorry, You don't have any event with this Event Id!" })
          }
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }

}


module.exports = { getAllEvents, getEventsCreatedBySpecificUser, getSpecificEvent, createEvent, updateEvent, getOptions };