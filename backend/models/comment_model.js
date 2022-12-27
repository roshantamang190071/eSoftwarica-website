
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    
     comment : {
         type: String
     },
     date : {
         type : String
     },
     user_id : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'User'
     },
     user_full_name : {
         type : String
     },
     post_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
})

const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;