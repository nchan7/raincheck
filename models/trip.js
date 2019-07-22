const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    name: String,
    zipStart: Number,
    zipDest: Number,
    startTime: Number,
    travelTime: Number,
    returnTime: Number,
    returnTravelTime: Number
})



module.exports = mongoose.model('Trip', tripSchema)