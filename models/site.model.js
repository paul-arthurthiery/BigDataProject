const mongoose = require('mongoose');
const autoIncrement = require('mongoose-mongoose-auto-increment');

const SiteSchema = mongoose.Schema({
  site_id: number,
  industry: String,
  sub_industry: String,
  square_feet: number,
  latitude: number,
  longitude: number,
  timezone: String,
  timezone_offset: number
});

autoIncrement.initialize(mongoose.connection);
SiteSchema.plugin(autoIncrement.plugin, 'Site');
module.exports = mongoose.model('Site', SiteSchema);
