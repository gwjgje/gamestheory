const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
     title: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     state: {
          type: String,
          required: true
     },
     country: {
          type: String,
          required: true
     },
     startTime: {
          type: Date,
          required: true
     },
     endTime: {
          type: Date,
          required: true
     },
     limit: {
          type: Number,
          required: true
     },
     participants: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
     }],
     organisedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
     }
}, { versionKey: false, timestamps: true })

const EventModel = mongoose.model('event', eventSchema)

module.exports = EventModel;