const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment_email: { type: String,required: true},
    // post_email: { type: String,required: true},
    post_id: { type: String, required: true},
    commenttxt: {type: String, required: true}
});


module.exports = mongoose.model('Comment',commentSchema);