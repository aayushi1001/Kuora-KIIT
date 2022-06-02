const mongoose = require("mongoose");

const report = mongoose.Schema({
  reason: { type: String, required: true },
  reporter: { type: String, required: true },
});

const reportSchema = mongoose.Schema({
  postid: { type: String, required: true },
  title: { type: String, required: true },
  post_email: { type: String, required: true },
  report: [report],
});

module.exports = mongoose.model("Report", reportSchema);
