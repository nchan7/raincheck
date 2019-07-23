const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    name: String,
    zipStart: Number,
    latStart: Number,
    longStart: Number,
    startTime: Number,
    travelTime: Number,
    zipDest: Number,
    latDest: Number,
    longDest: Number,
    returnTime: Number,
    returnTravelTime: Number

})



module.exports = mongoose.model('Trip', tripSchema)