
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    tag : {
        type : String
    },
     content : {
         type : String
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
     }
})

const post = mongoose.model('Post', postSchema);

module.exports = post;








