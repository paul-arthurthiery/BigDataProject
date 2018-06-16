var express = require('express');
var router = express.Router();

const consumptions = require('../controllers/consumption.controller.js');

// Create a new temperature
router.post('/consumptions', consumptions.create);

// Retrieve all consumptions
router.get('/consumptions', consumptions.findAll);

// Retrieve a single temperature with temperatureId
router.get('/consumptions/:temperatureId', consumptions.findOne);

// Update a Temperature with temperatureId
router.put('/consumptions/:temperatureId', consumptions.update);

// Delete a Temperature with temperatureId
router.delete('/consumptions/:temperatureId', consumptions.delete);

module.exports = router;
