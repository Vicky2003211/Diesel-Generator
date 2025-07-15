const mongoose = require('mongoose');

const DieselGeneratorSchema = new mongoose.Schema({
  name: String,
  serial_number: { type: String, unique: true },
  location: String
}, { timestamps: true });

module.exports = mongoose.model('DieselGenerator', DieselGeneratorSchema);
