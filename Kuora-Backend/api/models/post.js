const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  postid: mongoose.Schema.Types.ObjectId,
  creator_email: { type: String, required: true },
  title: { type: String, required: true },
  tag: { type: String, required: true },
  article: { type: String, required: true },
  verified: { type: Boolean, required: true },
  // postid: { type: Number, required: true},
});

module.exports = mongoose.model("Post", postSchema);
