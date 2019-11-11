const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const eventSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  recipient: {
    type: ObjectId,
    ref: "Recipient",
    required: true
  },
  eventName: {
    type: String,
  },
  created_at: {
    type: Date
  },
  money: {
    type: Number,
  }
});

module.exports = mongoose.model("Event", eventSchema);
