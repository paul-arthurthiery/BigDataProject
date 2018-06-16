var express = require('express');
var router = express.Router();

const sites = require('../controllers/site.controller.js');

// Create a new site
router.post('/sites', sites.create);

// Retrieve all sites
router.get('/sites', sites.findAll);

// Retrieve a single site with siteId
router.get('/sites/:siteId', sites.findOne);

// Update a Temperature with siteId
router.put('/sites/:siteId', sites.update);

// Delete a Temperature with siteId
router.delete('/sites/:siteId', sites.delete);

module.exports = router;
