const express = require('express');
const router = express.Router();

// Import the model to use its database functions
const burger = require('../models/burger');

// Create routes 
router.get('/', function(req, res) {
    burger.selectAll(function(data) {
        let hbsObject = {
            burgers: data
        };

        res.render('index', hbsObject)
    });
});


//Not today.... 

// Export routes for server.js
module.exports = router;