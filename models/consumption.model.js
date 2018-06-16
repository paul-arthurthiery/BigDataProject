const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const ConsumptionSchema = mongoose.Schema({
  timestamp: Number,
  dttm_utc: Date,
  value: Number,
  estimated: Number,
  anomaly: String
});

autoIncrement.initialize(mongoose.connection);
ConsumptionSchema.plugin(autoIncrement.plugin, 'Consumption');
module.exports = mongoose.model('Consumption', ConsumptionSchema);
