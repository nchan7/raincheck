const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    zipDest: Number,
    zipStart: Number,
    latStart: Number,
    longStart: Number,
    time: Number,
    latDest: Number,
    longDest: Number

})



module.exports = mongoose.model('Trip', tripSchema)