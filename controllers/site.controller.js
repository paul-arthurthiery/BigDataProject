const Site = require('../models/site.model.js');

// Create and Save a new Site
exports.create = (req, res) => {
  // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Site content cannot be empty"
        });
    }

    // Create a Site
    const site = new Site({
        content: req.body.content
    });

    // Save Site in the database
    site.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Site."
        });
    });
};

// Retrieve and return all sites from the database.
exports.findAll = (req, res) => {
  Site.find()
    .then(sites => {
        res.send(sites);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sites."
        });
    });
};

// Find a single site with a siteId
exports.findOne = (req, res) => {
  Site.findById(req.params.siteId)
    .then(site => {
        if(!note) {
            return res.status(404).send({
                message: "Site not found with id " + req.params.siteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Site not found with id " + req.params.siteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving site with id " + req.params.siteId
        });
    });
};

// Update a site identified by the siteId in the request
exports.update = (req, res) => {
  //Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Site content can not be empty"
        });
    }

    // Find note and update it with the request body
    Site.findByIdAndUpdate(req.params.siteId, {
        title: req.body.title || "Untitled Site",
        content: req.body.content
    }, {new: true})
    .then(site => {
        if(!site) {
            return res.status(404).send({
                message: "Site not found with id " + req.params.siteId
            });
        }
        res.send(site);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Site not found with id " + req.params.siteId
            });
        }
        return res.status(500).send({
            message: "Error updating site with id " + req.params.siteId
        });
    });
};

// Delete a site with the specified siteId in the request
exports.delete = (req, res) => {
  Site.findByIdAndRemove(req.params.siteId)
    .then(site => {
        if(!site) {
            return res.status(404).send({
                message: "Site not found with id " + req.params.siteId
            });
        }
        res.send({message: "Site deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Site not found with id " + req.params.siteId
            });
        }
        return res.status(500).send({
            message: "Could not delete site with id " + req.params.siteId
        });
    });
};
