const mongoose = require('mongoose');

const TelemetrySchema = new mongoose.Schema({
  dg_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DieselGenerator' },
  fuel_level_percent: Number,
  engine_temperature_celsius: Number,
  running_status: { type: String, enum: ['running', 'stopped', 'fault'] }
}, { timestamps: true });

module.exports = mongoose.model('Telemetry', TelemetrySchema);
