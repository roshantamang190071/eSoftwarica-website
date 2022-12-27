
const express = require("express");
const router = new express.Router();

const user_model = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/fileupload");
const auth = require("../middleware/auth");

// user register
router.post('/register/user', function (req, res) {

        const college_id = req.body.college_id;  //body.college_id is postman json college_id
        const full_name = req.body.full_name;
        const batch = req.body.batch;
        const password = req.body.password;

        //password encryption
        bcrypt.hash(password, 10, function (err, hash) {
                // console.log(hash);
                var mydata = new user_model({
                        college_id: college_id,  //{model.college_id : const college_id1}
                        password: hash,
                        full_name: full_name,
                        batch: batch
                });

                //then catch error handling
                mydata.save()
                        .then(function () {
                                res.status(201).json({ success: true, message: "Registration successful!" })
                        })
                        .catch(function (e) {
                                res.status(500).json({ message: e })
                        });
        });
})


//login
router.post("/login/user", function (req, res) {
        const college_id = req.body.college_id;
        const password = req.body.password;

        // college_id validation
        user_model.findOne({ college_id: college_id })
                .then(function (user_data) {
                        if (user_data == null) {
                                return res.status(403).json({ message: "Invalid Login!" })
                        }
                        // parameters(body.password, database.password )
                        bcrypt.compare(password, user_data.password, function (err, result) {
                                if (result === false) {
                                        return res.status(403).json({ message: "Invalid Login!" })
                                }
                                //generate token
                                const token = jwt.sign({ userID: user_data._id }, "zQB45Sd134_user")  //zQB45Sd134 = secret key
                                console.log("user")
                                res.status(200).json({ success: true, data: user_data._id, token: token, message: "Auth Success!" })
                        })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                })
})

//update user profile with image
router.put('/update/user/:id', upload.single("image"), function (req, res) {
        const id = req.params.id;
        const update = {
                "$set": {
                        "college_id": req.body.college_id,
                        "full_name": req.body.full_name,
                        "batch": req.body.batch,
                        "profile_pic": req.file.filename
                }
        };
        const option = {
                returnNewDocument: false
        }
        if (req.file == undefined) {
                return res.status(400).json({ message: "Only .png, .jpg, .jpeg format allowed" })
        } else {
                user_model.findOneAndUpdate({ "_id": id }, update, option)          // (query, update, option)
                        .then(function (result) {
                                res.status(201).json({success: true, message: "Successully updated!" })
                        })
                        .catch(function (e) {
                                res.status(500).json({ message: e })
                        });
                }
        })

//update user profile without image
router.put('/update/user', auth.verify_user,  function (req, res) {

        const id = req.user_data._id;
        const update = {
                "$set": {
                        "college_id": req.body.college_id,
                        "full_name": req.body.full_name,
                        "batch": req.body.batch
                }
        };
        const option = {
                returnNewDocument: false
        }
      
        user_model.findOneAndUpdate({ "_id": id }, update, option)          // (query, update, option)
                .then(function (result) {
                        res.status(201).json({success: true, message: "Successully updated!" })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                });
        
        })

//upload  image only
router.put("/profile/upload/:id", auth.verify_user, upload.single("image"), function (req, res) {

        const id = req.params.id
        if (req.file == undefined) {
                return res.status(400).json({ message: "Only .png, .jpg, .jpeg format allowed" })

        } else {
                user_model.findOneAndUpdate({ "_id": id }, { profile_pic: req.file.filename }, { returnNewDocument: false })
                        .then(function (result) {
                                res.status(201).json({ message: "Profile picture uploaded!" })
                        })
                        .catch(function (e) {
                                res.status(500).json({ message: e })
                        });
        }
})

// to display single user profile
router.get("/user/:id", function (req, res) {
        const id = req.params.id;
        user_model.findById(id)
                .then(function (result) {
                        res.status(201).json({success:true , data: result})
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                });
})

router.get("/myprofile", auth.verify_user, function (req, res) {
       
        user_model.find()
        .then(function(result){
                res.status(201).json({ success : true,message: "Successully updated!", data : req.user_data})  
        })
        .catch(function (e) {
                res.status(500).json({ message: e })
        });
})

//file insert / upload / profile pic

//  router.post("/profile/upload1", upload.single("image"), function(req,res){
//        // res.send()
//        console.log(req.file)
//        if (req.file == undefined){
//                return res.status(400).json({message : "Only .png, .jpg, .jpeg format allowed"})
//        }else{
//         const data = new user_model({
//                 profile_pic : req.file.filename
//         })
//         data.save()
//         .then(function(result){
//                 res.status(201).json({message : "Profile picture uploaded!"})
//         })
//         .catch(function(e){
//                 res.status(500).json({message : e})
//         });
//         }
// })

// router.put("/profile/upload", auth.verify_user, upload.single("image"), function(req,res){
//         // res.send()
//         console.log(req.file)
//         if (req.file == undefined){
//                 return res.status(400).json({message : "Only .png, .jpg, .jpeg format allowed"})
//         }else{
//          user_model.findOneAndUpdate({_id: req.body.id}, {profile_pic : req.file.filename}, {returnNewDocument: false})
//          .then(function(result){
//                  res.status(201).json({message : "Profile picture uploaded!"})
//          })
//          .catch(function(e){
//                  res.status(500).json({message : e})
//          });
//          }
//  })


//updates pp in user table
//working

// router.put("/user/update", upload.single("image"), function(req,res){

//         const id = req.body.id;
//         const file = req.file.filename;

//         // console.log(req.body.id)
//         console.log(req.file)

//         userModel.updateOne({_id: id},{profile_pic : file})
//         .then(function(result){
//                 res.status(201).json({message : "successully updated!"})
//         })
//         .catch(function(e){
//                 res.status(500).json({message : e})
//         });
//  })

module.exports = router