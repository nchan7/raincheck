const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    tripName: String,
    zipStart: Number,
    latStart: Number,
    longStart: Number,
    startTime: Number, // need to change to Date or Timestamp after route testing
    travelTime: Number,
    zipDest: Number,
    latDest: Number,
    longDest: Number,
    returnTime: Number, // need to change to Date or Timestamp after route testing
    returnTravelTime: Number
})

module.exports = mongoose.model('Trip', tripSchema)