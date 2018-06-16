var express = require('express');
var router = express.Router();

const consumptions = require('../controllers/consumption.controller.js');

// Create a new consumption
router.post('/consumptions', consumptions.create);

// Retrieve all consumptions
router.get('/consumptions', consumptions.findAll);

// Retrieve a single consumption with consumptionId
router.get('/consumptions/:consumptionId', consumptions.findOne);

// Update a Temperature with consumptionId
router.put('/consumptions/:consumptionId', consumptions.update);

// Delete a Temperature with consumptionId
router.delete('/consumptions/:consumptionId', consumptions.delete);

module.exports = router;
