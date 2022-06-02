const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");

router.post("/:postid", (req, res, next) => {
  const postid = req.params.postid;
  Post.update({ postid: postid }, { $set: { article: req.body.newarticle } })
    .exec()
    .then((result) => {
      console.log(result);
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
