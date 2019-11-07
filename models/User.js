const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  facebook_id: {
    type: String
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  picture: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);
