const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  gender: { type: String },
  bio: { type: String },
  year: { type: Number },
  signupas: { type: String, required: true },
  mobno: { type: Number },
  pic: { type: String },
  tag: { type: String },
  verified: { type: Boolean, required: true},
  approvedBy: { type: String},
  blocked: { type: Boolean, required: true}
//   postcount: { type: Number, required: true },
});

module.exports = mongoose.model("User", userSchema);
