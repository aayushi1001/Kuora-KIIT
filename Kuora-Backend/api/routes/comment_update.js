const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comment= require("../models/comment");

router.post('/:comment_email/:post_id',(req,res,next) =>{
    const comment_email= req.params.comment_email;
    const post_id=req.params.post_id;
    Comment.update({comment_email:comment_email,post_id:post_id},{$set: {commenttxt : req.body.newcommenttxt}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
        })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;