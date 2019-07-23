const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

const Trips = require('../models/trip')
const User = require('../models/user')
const mapbox = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mapbox({accessToken: process.env.MAPBOX_PUBLIC_KEY});

router.use(express.urlencoded({extended: false}));

// GET ALL trips for a user
router.get('/', (req, res) => {
    User.findById(req.user._id).populate('trips').exec( (err,user) => {
        console.log(user)
        if (err) res.json(err)
        res.json(user.trips)
    })
});

// GET ONE trip for a user
router.get('/:id', (req, res) => {
    Trips.findById(req.params.id).then( (err,trip) => {
        if (err) res.json(err)
        res.json(trip)
    })
});


// POST trip for a user - WORKING
router.post('/', (req, res) => {
    User.findById(req.user, function(err, user){
        Trips.create({
            tripName: req.body.tripName,
            zipStart: req.body.zipStart,
            latStart: req.body.latStart,
            longStart: req.body.longStart,
            startTime: req.body.startTime,
            travelTime: req.body.travelTime,
            zipDest: req.body.zipDest,
            latDest: req.body.latDest,
            longDest: req.body.longDest,
            returnTime: req.body.returnTime,
            returnTravelTime: req.body.returnTravelTime
        },
        function(err, trip) {
            user.trips.push(trip)
            user.save(function(err, user) {
                if (err) res.json(err)
                res.json({user})
            })
        })
    })
});

// POST trip for a user - TESTING MAPBOX CONVERSION of zip to lat/long
// router.post('/', (req, res) => {

//     let locStart = req.body.zipStart; 
//     // Seattle, WA
//     // use geocoder to query the location with sushi appended to the query
//     // then take response from mapbox and render "show" with the data
//     geocodingClient.forwardGeocode({
//     query: locStart
//     }).send().then( function(response) {   
//         var latStartFromZip = response.body.features[0].center[1];
//         var longStartFromZip = response.body.features[0].center[0];

//         let locStart = req.body.zipStart; 
//         geocodingClient.forwardGeocode({
//         query: locStart
//         }).send().then( function(response) {   
//             var latStartFromZip = response.body.features[0].center[1];
//             var longStartFromZip = response.body.features[0].center[0];
    

//     User.findById(req.user, function(err, user){
//         Trips.create({
//             tripName: req.body.tripName,
//             zipStart: req.body.zipStart,
//             latStart: latStartFromZip,
//             longStart: longStartFromZip,
//             startTime: req.body.startTime,
//             travelTime: req.body.travelTime,
//             zipDest: req.body.zipDest,
//             latDest: req.body.latDest,
//             longDest: req.body.longDest,
//             returnTime: req.body.returnTime,
//             returnTravelTime: req.body.returnTravelTime
//         },
//         function(err, trip) {
//             user.trips.push(trip)
//             user.save(function(err, user) {
//                 if (err) res.json(err)
//                 res.json({user})
//             })
//         })
//     })
// });

// UPDATE trip for a user
router.put('/:id', (req, res) => {
        Trips.findByIdAndUpdate(req.params.id, 
            {
                tripName: req.body.tripName,
                zipStart: req.body.zipStart,
                latStart: req.body.latStart,
                longStart: req.body.longStart,
                startTime: req.body.startTime,
                travelTime: req.body.travelTime,
                zipDest: req.body.zipDest,
                latDest: req.body.latDest,
                longDest: req.body.longDest,
                returnTime: req.body.returnTime,
                returnTravelTime: req.body.returnTravelTime
            },{new: true}, 
            function(err, trip) {
                    if (err) res.json(err)
                    res.json({trip})
            })
})

// DELETE trip for a user
router.delete('/:id', (req, res) => {
    User.findById(req.user, function(err, user) {
        Trips.findOneAndRemove({
            _id: req.params.id
        },
        function(err) {
            if (err) res.json(err);
            res.json({type: 'success', message: 'You deleted one trip'})
        })
    })
})

module.exports = router; 