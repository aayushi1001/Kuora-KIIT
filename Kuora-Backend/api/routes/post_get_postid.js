const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post= require("../models/post");

router.get('/:postid',(req,res,next) =>{
        const postid=req.params.postid;
        Post.find({postid:postid})
        .exec()
        .then(result =>{
            res.status(200).json({
            code:200,
            message: 'Post Successfully found',
            post: result
        });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
        
    });

module.exports = router;