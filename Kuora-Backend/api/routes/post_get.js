const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post= require("../models/post");

router.get('/',(req ,res ,next) => {
    Post.find()
    .exec()
    .then(result =>{
        res.status(200).json({
            code:200,
            message: 'Post Successfully found',
            post: result
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