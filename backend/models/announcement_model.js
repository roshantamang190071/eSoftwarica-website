
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    tag : {
        type : String
    },
     content : {
         type: String
     },
     date : {
         type : String
     },
     admin : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'Admin'
     }
})

const announcement = mongoose.model('Announcement', announcementSchema);

module.exports = announcement;
