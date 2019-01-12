const express = require('express');
const router = express.Router();

// Import the model to use its database functions
const burger = require('../models/burger');

// Create routes 
router.get('/', (req, res) => {
    // res.send("We connected")
    burger.selectAll((data) => {
        let hbsObject = {
            burgers: data
        };

        res.render('index', hbsObject)
    });
});

// Create a new burger entry 
router.post('/', (req, res) => {
    burger.insertOne([
            'burger_name', 'devoured'
        ], [
            req.body.burger_name, req.body.devoured
        ], 
        (data) => {
            res.redirect('/');
        });
});
//UPDATE BURGERS SET {devoured: true} WHERE {id: burgerID}
//UPDATE BURGERS SET objColVals WHERE condition
router.post('/:id', (req, res) => {
    burger.updateOne(req.params.id, (data) => {
        res.redirect('/');
    });
});

// Export routes for server.js
module.exports = router;