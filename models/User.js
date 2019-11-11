const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  recipients: [
    {
      type: ObjectId,
      ref: "Recipient"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
