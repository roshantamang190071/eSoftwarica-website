
const express = require("express");
const router = new express.Router();

const post_model = require("../models/post_model");
const auth = require("../middleware/auth");

//get all post
router.get('/post/showall', auth.verify_user, function (req, res) {

        post_model.find()
                .then(function (data) {
                        res.status(201).json({ success: true, data: data })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                })
})

// get my posts
router.get('/myposts', auth.verify_user, function (req, res) {

        post_model.find({ "user_id": req.user_data._id })
                .then(function (data) {
                        res.status(201).json({ success: true, data: data })
                        // res.status(201).json(data)
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                })
})

//add a post
router.post('/addpost', auth.verify_user, function (req, res) {
        
        //get date in readable format
        function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
        }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0'); //day
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var date1 = dd + '/' + mm + '/' + yyyy + " " + formatAMPM(new Date)

        const tag = req.body.tag;
        const content = req.body.content;
        const user_id = req.user_data._id;
        const date = date1
        const user_full_name = req.user_data.full_name;

        var mydata = new post_model({

                tag: tag,
                content: content,
                date: date,
                user_id: user_id,
                user_full_name: user_full_name
        })
        mydata.save()
                .then(function () {
                        res.status(201).json({ success: true, message: "Post added!" })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                })
})

// update post
router.put('/updatepost/:id', auth.verify_user, function (req, res) {
        const id = req.params.id;
        const update = {
                "$set": {
                        "tag": req.body.tag,
                        "content": req.body.content
                }
        };
        const option = {
                returnNewDocument: false
        }
        post_model.findOneAndUpdate({ "_id": id }, update, option)          // (query, update, option)
                .then(function (result) {
                        res.status(201).json({ success: true, message: "Post updated!" })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                });
})

// to display single post
router.get("/post/:id", function (req, res) {
        const id = req.params.id;
        post_model.findById(id)
                .then(function (result) {
                        res.status(201).json({success: true, data : result})
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                });
})

//find my posts
router.get("/mypost/:user_id", function (req, res) {

        const user_id = req.params.user_id;

        post_model.find({ "user_id": user_id })
                .then(function (result) {
                        console.log(result)
                        res.status(201).json({ success: true, data: result, message: "Found!" })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                });
})

//delete post
router.delete('/deletepost/:id', auth.verify_user, function (req, res) {
        const id = req.params.id;
        console.log(id)

        post_model.deleteOne({ _id: id })
                .then(function (result) {
                        res.status(201).json({ success: true, message: "Post deleted!" })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                });

})

//to delete reported posts by admin
router.delete('/deleteReportedpost/:id', auth.verify_admin, function (req, res) {
        const id = req.params.id;
        post_model.findOneAndDelete({ _id: id })
                .then(function (result) {
                        res.status(201).json({ success: true, message: "Post deleted!" })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                });

})

module.exports = router