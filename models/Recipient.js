const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  relation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Recipient", recipientSchema);
