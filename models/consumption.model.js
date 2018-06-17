const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const SiteSchema = mongoose.Schema({
  siteId: Number,
  industry: String,
  sub_industry: String,
  square_feet: Number,
  latitude: Number,
  longitude: Number,
  timezone: String,
  timezone_offset: String
});

const ConsumptionSchema = mongoose.Schema({
  timestamp: Number,
  dttm_utc: Date,
  value: Number,
  estimated: Number,
  anomaly: String,
  site: [SiteSchema]
});

autoIncrement.initialize(mongoose.connection);
ConsumptionSchema.plugin(autoIncrement.plugin, 'Consumption');
module.exports = mongoose.model('Consumption', ConsumptionSchema);
