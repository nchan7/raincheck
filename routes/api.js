const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
    console.log("TESTTEST")
    res.json({type: 'success', message: 'You accessed the protected api routes'})
});

module.exports = router; 