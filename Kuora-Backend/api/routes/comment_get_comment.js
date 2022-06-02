const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comment= require("../models/comment");

router.get('/:comment_email',(req,res,next) =>{
        const comment_email=req.params.comment_email;
        Comment.find({comment_email:comment_email})
        .exec()
        .then(result =>{
            res.status(200).json({
            code:200,
            message: 'Comment Successfully found',
            comment: result
        });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                code:500,
                error:err
            });
        });
        
    });

module.exports = router;