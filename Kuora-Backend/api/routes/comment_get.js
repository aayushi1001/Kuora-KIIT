const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comment= require("../models/comment");

router.get('/',(req ,res ,next) => {
    Comment.find()
    .exec()
    .then(result =>{
        res.status(200).json({
            code:200,
            message: 'Comment Successfully found',
            comment: result
        });
    })
    .catch(err =>{
        console.log(err);
        req.status(500).json({
            code:500,
            error:err
        });
    });
});

module.exports = router;