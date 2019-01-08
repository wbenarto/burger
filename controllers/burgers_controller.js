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

router.get('/burgers', (req, res) => {
    
});

router.get('/menu', (req, res) => {

});

// router.get('/burgers', (req, res) => {
//     burger.selectAll((data) => {
//         console.log(data)
//         let hbsObject = {
//             burgers: data
//         };

//         res.send(res)
//     });
// });

// Create a new burger entry 
router.post('/burgers', (req, res) => {
    burger.insertOne([
            'burger_name'
        ], [
            req.body.burger_name
        ], 
        (data) => {
            res.redirect('/');
        });
});
    
router.put('/burgers/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;

    burger.updateOne({
        devoured: true
    }, condition, (data) => {
        res.redirect('/');
    });
});

// Export routes for server.js
module.exports = router;