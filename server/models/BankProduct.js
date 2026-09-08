const mongoose = require('mongoose');

const bankProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  eligibility: { type: String },
  benefits: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('BankProduct', bankProductSchema);