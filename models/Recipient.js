const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const recipientSchema = new mongoose.Schema({
  owner: {
    type: ObjectId,
    ref: "User"
  },
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
