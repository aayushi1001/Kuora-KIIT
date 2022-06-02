const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/post");
const bcryptjs = require("bcryptjs");

router.post("/", (req, res, next) => {
  const post = new Post({
    // _id: new mongoose.Types.ObjectId(),
    postid: new mongoose.Types.ObjectId(),
    creator_email: req.body.creator_email,
    title: req.body.title,
    tag: req.body.tag,
    article: req.body.article,
    verified: req.body.verified,
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "Post Successfully Submitted",
        Post: result,
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

router.delete("/:postid", (req, res, next) => {
  const postid = req.params.postid;
  Post.remove({ postid: postid })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
