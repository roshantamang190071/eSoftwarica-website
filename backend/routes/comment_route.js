
const express = require("express");
const router = new express.Router();

const comment_model = require("../models/comment_model");
const auth = require("../middleware/auth");

// add comment
router.post('/addcomment', auth.verify_user, function(req,res){
        //get date in readable format
        function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
              }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0'); //day
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        var date1 = dd + '/' + mm + '/' + yyyy + " " + formatAMPM(new Date)
        
        const comment = req.body.comment;
        const user_id = req.user_data._id;
        const user_full_name = req.user_data.full_name;
        const post_id = req.body.post_id;
        const date = date1

        var mydata = new comment_model({
                comment : comment,
                date : date,
                post_id : post_id,
                user_id : user_id,
                user_full_name : user_full_name
        })
        
        mydata.save()
        .then(function(){
                res.status(201).json({success: true, message : "comment added!"})
        })
        .catch(function(e){
                res.status(500).json({message : e})
        })        
})

router.get("/comments/:id", function(req, res){

        const post_id = req.params.id;

        comment_model.find({"post_id": post_id})
        .then(function(result){
                res.status(201).json({success: true, data: result, message : "Found!"})
        })
        .catch(function(e){
                res.status(500).json({message : e})
        });
})

//delete comment related to deleted post
// router.delete('/deletecomment/:id', function(req,res){

//         const post_id = req.params.id;
        
//         comment_model.remove({"post_id": post_id})
//         .then(function(result){
//                 res.status(201).json({message : "Comment deleted!"})
//         })
//         .catch(function(e){
//                 res.status(500).json({message : e})
//         });

// })

// router.put('/updatecomment', auth.verify_user, function(req,res){

//     const id = req.body.id;

//     const update = {
//             "$set": {
//               "comment": req.body.comment,
//             }
//           };

//     const option =  { 
//             returnNewDocument: false
//              }
    
//     comment_model.findOneAndUpdate({"_id" : id} , update, option)          // (query, update, option)
//     .then(function(result){
//             res.status(201).json({message : "Comment updated!"})
//     })
//     .catch(function(e){
//             res.status(500).json({message : e})
//     });
// })

// router.delete('/deletecomment', auth.verify_user, function(req,res){
//         const id = req.body.id;

//         comment_model.findOneAndDelete({"_id" : id})
//         .then(function(result){
//                 res.status(201).json({message : "Comment deleted!"})
//         })
//         .catch(function(e){
//                 res.status(500).json({message : e})
//         });

// })
 
module.exports = router