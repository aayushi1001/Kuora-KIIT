const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comment= require("../models/comment");

router.get('/:post_id',(req,res,next) =>{
        const post_id=req.params.post_id;
        Comment.find({post_id:post_id})
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
                error:err
            });
        });
        
    });

module.exports = router;