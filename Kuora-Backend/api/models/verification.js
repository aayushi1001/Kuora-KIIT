const mongoose = require("mongoose");

const verificationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  request: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  documentPic: { type: String, required: true },
});

module.exports = mongoose.model("Verification", verificationSchema);
