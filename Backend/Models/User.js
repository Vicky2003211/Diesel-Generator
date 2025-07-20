const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  org_id: { type: String, required: true },
  org_name: { type: String, required: true }
}));
