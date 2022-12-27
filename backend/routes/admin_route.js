
const express = require("express");
const router = new express.Router();

const admin_model = require("../models/admin_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/fileupload");
const auth = require("../middleware/auth");

router.post('/register/admin',function(req,res){

        const college_id = req.body.college_id;  //body.college_id is postman json college_id
        const full_name= req.body.full_name;
        const password = req.body.password;

        //encrypt password
        bcrypt.hash(password, 10, function(err, hash){

                var mydata = new admin_model({
                        college_id : college_id,  //{model.college_id : const college_id1}
                        full_name : full_name,
                        password : hash,
                       
                });

                mydata.save()
                .then(function(){
                        res.status(201).json({message : "Registration successful!"})
                })
                .catch(function(e){
                        res.status(500).json({message : e})
                });   
        });        
})


//admin login
router.post("/login/admin", function(req,res){
        const college_id = req.body.college_id;
        const password = req.body.password;

        // college_id validation
        admin_model.findOne({college_id : college_id})
        .then(function(admin_data){
                                
                if (admin_data == null){
                        return res.status(403).json({message : "Invalid Login!"})
                }

                // parameters(body.password, database.password )
                bcrypt.compare(password, admin_data.password, function(err, result){

                        if(result === false){
                                return res.status(403).json({message : "Invalid Login!"})
                        }

                        //generate token
                        const token = jwt.sign({adminID : admin_data._id}, "zQB45Sd134_admin")  //zQB45Sd134 = secret key
                        console.log("admin")
                        res.status(200).json({token : token, data : admin_data, message: "Auth Success!"})   
                })
        })
        .catch(function(e){
               res.status(500).json({message : e})
        })
})


 // to display admin profile
 router.get("/admin/:id", function(req,res){

        const id = req.params.id;
        
        admin_model.findById(id)
        .then(function(result){
                res.status(201).json(result)
                console.log(data)
        })
        .catch(function(e){
                res.status(500).json({message : e})
        });
})

//update admin profile with image
router.put('/update/admin/:id', upload.single("image"),function(req,res){

        const id = req.params.id;
        const update = {
                "$set": {
                  "full_name": req.body.full_name,
                  "college_id": req.body.college_id,
                  "profile_pic" : req.file.filename
                }
              };
        const option =  { 
                returnNewDocument: false
                 }
        admin_model.findOneAndUpdate({"_id" : id} , update, option)          // (query, update, option)
        .then(function(result){
                res.status(201).json({message : "Successully updated!"})
        })
        .catch(function(e){
                res.status(500).json({message : e})
        });
})

//only image or profile picture
// router.put('/update/admin_profile', auth.verify_admin, function(req,res){
//         const id = req.body.id;
//         const update = {
//                 "$set": {
//                   "profile_pic" : req.file.filename
//                 }
//               };
//         const option =  { 
//                 returnNewDocument: false
//                  }
//         admin_model.findOneAndUpdate({"_id" : id} , update, option)          // (query, update, option)
//         .then(function(result){
//                 res.status(201).json({message : "Profile picture uploaded!"})
//         })
//         .catch(function(e){
//                 res.status(500).json({message : e})
//         });
// })
 
module.exports = router