const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const SiteSchema = mongoose.Schema({
  site_id: Number,
  industry: String,
  sub_industry: String,
  square_feet: Number,
  latitude: Number,
  longitude: Number,
  timezone: String,
  timezone_offset: String
});

autoIncrement.initialize(mongoose.connection);
SiteSchema.plugin(autoIncrement.plugin, 'Site');
module.exports = mongoose.model('Site', SiteSchema);
