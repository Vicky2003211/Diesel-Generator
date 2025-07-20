const mongoose = require('mongoose');

const DieselGeneratorSchema = new mongoose.Schema({
  name: String,
  serial_number: { type: String, unique: true },
  location: String,
  org_id: {
    type: String,
    required: true // Optional but recommended
  }
}, { timestamps: true });

module.exports = mongoose.model('DieselGenerator', DieselGeneratorSchema);
