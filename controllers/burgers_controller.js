const express = require('express');
const router = express.Router();

// Import the model to use its database functions
const burger = require('../models/burger');

// Create routes 
router.get('/', (req, res) => {
    res.send("We connected")
    // burger.selectAll((data) => {
    //     let hbsObject = {
    //         burgers: data
    //     };

    //     res.render('index', hbsObject)
    // });
});

router.get('/burgers', (req, res) => {
    
});

router.get('/menu', (req, res) => {

});

router.get('/api/burgers', (req, res) => {
    burger.selectAll((data) => {
        console.log(data)
        let hbsObject = {
            burgers: data
        };

        res.render('index', hbsObject)
    });
});

//Not today.... 

// Export routes for server.js
module.exports = router;