const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  org_id: { type: String, required: true, unique: true },    // e.g., "ORG001"
  org_name: { type: String, required: true }
});

module.exports = mongoose.model('Organization', organizationSchema);
