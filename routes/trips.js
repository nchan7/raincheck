const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

const Trips = require('../models/trip')
// const User = require('../models/user')

router.use(express.urlencoded({extended: false}));

router.get('/userinfo', (req,res) => {
    res.json({thing: req.data, thong: 'hello'})
})

router.get('/', (req, res) => {
    res.json({type: 'success', message: 'You accessed the protected GET ALL TRIPS route'})
    // res.json({trips})
});

router.get('/:id', (req, res) => {
    res.json({type: 'success', message: 'You accessed the protected GET SINGLE TRIP BY ID route'})
});

router.post('/', (req, res) => {
        // console.log(req.body.user)
        Trips.create({
            zipDest: req.body.zipDest,
            zipStart: req.body.zipStart,
            latStart: req.body.latStart,
            longStart: req.body.longStart,
            travelTime: req.body.travelTime,
            latDest: req.body.latDest,
            longDest: req.body.longDest
        },
        function(err, trips) {
            if (err) res.json(err)
            res.json({type: 'success', message: 'You accessed the protected POST new TRIPS route'})
        })
});

router.put('/:id', (req, res) => {
    // Find the user req.body.user 
    
    Trips.findByIdAndUpdate(req.params.id, 
        {
            zipDest: req.body.zipDest,
            zipStart: req.body.zipStart,
            latStart: req.body.latStart,
            longStart: req.body.longStart,
            travelTime: req.body.travelTime,
            latDest: req.body.latDest,
            longDest: req.body.longDest
        }, 
        function(err, trips) {
        if (err) res.json(err)
        res.json({type: 'success', message: 'You accessed the protected PUT edit TRIPS route'})
    })
})

router.delete('/:id', (req, res) => {
    findById()
    Trips.findOneAndRemove({
        _id: req.params.id
    },
    function(err) {
        if (err) res.json(err);
        res.json({type: 'success', message: 'You deleted one trip'})
    })
})

module.exports = router; 