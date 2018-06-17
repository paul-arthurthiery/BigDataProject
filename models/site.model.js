const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const SiteSchema = mongoose.Schema({
  SITE_ID: Number,
  INDUSTRY: String,
  SUB_INDUSTRY: String,
  SQ_FT: Number,
  LAT: Number,
  LNG: Number,
  TIME_ZONE: String,
  TIME_ZONE: String
});

autoIncrement.initialize(mongoose.connection);
SiteSchema.plugin(autoIncrement.plugin, 'Site');
module.exports = mongoose.model('Site', SiteSchema);
