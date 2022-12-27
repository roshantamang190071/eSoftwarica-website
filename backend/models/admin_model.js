
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    
    college_id : {
        type : String
    },
    full_name :{
        type : String
    }, 
    password : {
        type : String
    },
    profile_pic : {
        type: String
    },
    user_type : {
        type : String,
        default : "admin"
    }
})

const admin = mongoose.model('admin', adminSchema)

module.exports = admin
