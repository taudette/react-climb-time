var mongoose = require('mongoose');

var climberSchema = new mongoose.Schema({
  climberId: { type: String, unique: true, index: true },
  name: String,
  style: String,
  contact: Number,
  area: String
});

module.exports = mongoose.model('Climber', climberSchema);