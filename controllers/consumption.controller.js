const Consumption = require('../models/consumption.model.js');

// Create and Save a new Consumption
exports.create = (req, res) => {
  // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Consumption content cannot be empty"
        });
    }

    // Create a Consumption
    const consumption = new Consumption({
        content: req.body.content
    });

    // Save Consumption in the database
    consumption.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Consumption."
        });
    });
};

// Retrieve and return all consumptions from the database.
exports.findAll = (req, res) => {
  Consumption.find()
    .then(consumptions => {
        res.send(consumptions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving consumptions."
        });
    });
};

// Find a single consumption with a consumptionId
exports.findOne = (req, res) => {
  Consumption.findById(req.params.consumptionId)
    .then(consumption => {
        if(!note) {
            return res.status(404).send({
                message: "Consumption not found with id " + req.params.consumptionId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Consumption not found with id " + req.params.consumptionId
            });
        }
        return res.status(500).send({
            message: "Error retrieving consumption with id " + req.params.consumptionId
        });
    });
};

// Update a consumption identified by the consumptionId in the request
exports.update = (req, res) => {
  //Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Consumption content can not be empty"
        });
    }

    // Find note and update it with the request body
    Consumption.findByIdAndUpdate(req.params.consumptionId, {
        title: req.body.title || "Untitled Consumption",
        content: req.body.content
    }, {new: true})
    .then(consumption => {
        if(!consumption) {
            return res.status(404).send({
                message: "Consumption not found with id " + req.params.consumptionId
            });
        }
        res.send(consumption);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Consumption not found with id " + req.params.consumptionId
            });
        }
        return res.status(500).send({
            message: "Error updating consumption with id " + req.params.consumptionId
        });
    });
};

// Delete a consumption with the specified consumptionId in the request
exports.delete = (req, res) => {
  Consumption.findByIdAndRemove(req.params.consumptionId)
    .then(consumption => {
        if(!consumption) {
            return res.status(404).send({
                message: "Consumption not found with id " + req.params.consumptionId
            });
        }
        res.send({message: "Consumption deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Consumption not found with id " + req.params.consumptionId
            });
        }
        return res.status(500).send({
            message: "Could not delete consumption with id " + req.params.consumptionId
        });
    });
};
