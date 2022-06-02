const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    voter_email: { type: String,required: true},
    // post_email: { type: String,required: true},
    post_id: { type: String, required: true},
    rating: {type: Number, required: true}
});


module.exports = mongoose.model('Vote',voteSchema);