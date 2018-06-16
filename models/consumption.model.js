const mongoose = require('mongoose');
const autoIncrement = require('mongoose-mongoose-auto-increment');

const ConsumptionSchema = mongoose.Schema({
  timestamp: number,
  dttm_utc: Date,
  value: number,
  estimated: number,
  anomaly: String
});

autoIncrement.initialize(mongoose.connection);
ConsumptionSchema.plugin(autoIncrement.plugin, 'Consumption');
module.exports = mongoose.model('Consumption', ConsumptionSchema);
