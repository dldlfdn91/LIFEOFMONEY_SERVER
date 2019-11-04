const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const eventSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  recipient_id: [
    {
      type: String,
      required: true
    }
  ],
  sort: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Event", eventSchema);
