const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Comment = require("../models/comment");
const bcryptjs = require("bcryptjs");

router.post("/", (req, res, next) => {
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    comment_email: req.body.comment_email,
    // post_email: req.body.post_email,
    post_id: req.body.post_id,
    commenttxt: req.body.commenttxt,
  });

  comment
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "comment Successfully Submitted",
        comment: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        code: 500,
        error: err,
      });
    });
});

module.exports = router;
