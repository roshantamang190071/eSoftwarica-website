
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    college_id : {
        type : String
    },
    full_name :{
        type : String
    },   
    password : {
        type : String
    },
    batch : {
        type : String
    },
    profile_pic : {
        type: String
    },
    user_type : {
        type : String,
        default : "user" 
    }
})

const user = mongoose.model('User', userSchema)

module.exports = user



