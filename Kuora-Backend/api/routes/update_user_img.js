const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const upload = multer({ storage: storage });

router.post("/:email", upload.single("pic"), (req, res, next) => {
  const email = req.params.email;
  User.updateOne({ email: email }, { pic: req.file.path })
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
