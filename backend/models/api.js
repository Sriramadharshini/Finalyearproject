const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  type_key: {
    type: String,
    required: true,
    unique: true,
    enum: ['OpenAI', 'Claude']
  },
  api_key: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Api', apiSchema);