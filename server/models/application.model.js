const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
     event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "event"
     },
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
     },
     status: {
          type: String,
          enum: {
               values: ["accepted", "pending", "rejected"],
               message: 'Please choose from this options: "accepted", "pending", "rejected"',
          },
          default: 'pending'
     }
}, { versionKey: false, timestamps: true })

const ApplicationModel = mongoose.model('application', applicationSchema);

module.exports = ApplicationModel