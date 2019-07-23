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
// router.post('/', (req, res) => {
//     User.findById(req.user, function(err, user){
//         Trips.create({
//             tripName: req.body.tripName,
//             zipStart: req.body.zipStart,
//             latStart: req.body.latStart,
//             longStart: req.body.longStart,
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

// POST trip for a user - TESTING MAPBOX CONVERSION of zip to lat/long
router.post('/', (req, res) => {
    console.log("Hitting the POST new trip route");
    // var latStartFromZip;
    // var longStartFromZip;

    let locStart = req.body.zipStart; 
    geocodingClient.forwardGeocode({
    query: locStart
    }).send().then( function(response) {
        console.log("We got the start lat long")
        var latStartFromZip = response.body.features[0].center[1];
        var longStartFromZip = response.body.features[0].center[0];

        let locDest = req.body.zipDest;
        geocodingClient.forwardGeocode({
            query: locDest
        }).send().then( function(response) {
            console.log("We got the return lat long")
            var latDestFromZip = response.body.features[0].center[1];
            var longDestFromZip = response.body.features[0].center[0];
        
            // let startDate = new Date(req.body.startTime);
        
            User.findById(req.user._id, function(err, user){
                console.log("We got the user")
                Trips.create({
                    tripName: req.body.tripName,
                    zipStart: req.body.zipStart,
                    latStart: latStartFromZip,
                    longStart: longStartFromZip,
                    startTime: req.body.startTime,
                    travelTime: req.body.travelTime,
                    zipDest: req.body.zipDest,
                    latDest: latDestFromZip,
                    longDest: longDestFromZip,
                    returnTime: req.body.returnTime,
                    returnTravelTime: req.body.returnTravelTime
                },
                function(err, trip) {
                    console.log("We created the trip")
                    console.log(err);
                    console.log(trip);
                    user.trips.push(trip)
                    user.save(function(err, user) {
                        if (err) res.json(err)
                        res.json({user})
                    })
                })
            })
        
        }).catch((err) =>  {
            console.log("Mapbox problem!!!!!");
        });



    })
    
});

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