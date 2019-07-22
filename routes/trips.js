const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

const Trips = require('../models/trip')

router.use(express.urlencoded({extended: false}));

router.get('/', (req, res) => {
    res.json({type: 'success', message: 'You accessed the protected GET ALL TRIPS route'})
});

router.get('/:id', (req, res) => {
    res.json({type: 'success', message: 'You accessed the protected GET SINGLE TRIP BY ID route'})
});

router.post('/', (req, res) => {
    Trips.create({
        zipDest: req.body.zipDest,
        zipStart: req.body.zipStart,
        latStart: req.body.latStart,
        longStart: req.body.longStart,
        time: req.body.time,
        latDest: req.body.latDest,
        longDest: req.body.longDest
        // zipDest: '99999',
        // zipStart: '88888',
        // latStart: '45.222',
        // longStart: '-122.333',
        // time: '23',
        // latDest: '55.333',
        // longDest: '-123.222'

    },
    function(err, trips) {
        if (err) res.json(err)
        res.json({type: 'success', message: 'You accessed the protected POST new TRIPS route'})
    })
});

// app.post('/cameras', (req, res) => {
//     Cameras.create({
//     brand: req.body.brand,
//     model: req.body.model,
//     quality: req.body.quality,
//     format: req.body.format,
//     megaPixels: req.body.megaPixels,
//     lenses: req.body.lenses
//     // lenses: [{brand: "Lumix", focalLength: 15, type: "standard"}]
//     }, function(err, cameras) {
//         if (err) res.json(err)
//         res.json(cameras)
//     })
// })

module.exports = router; 