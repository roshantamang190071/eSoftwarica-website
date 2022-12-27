
const mongoose = require("mongoose");

const reported_postSchema = new mongoose.Schema({

     reported_post_id : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Post'
     },
     tag : {
          type : String
     },
     content : {
          type : String
     },
     user_full_name : {
         type : String
     },
     date :{
          type :String
     },
     reported_by_full_name : {
          type : String
     }
})

const reported_post = mongoose.model('Reported_post', reported_postSchema);

module.exports = reported_post;
