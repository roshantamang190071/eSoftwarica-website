
const express = require("express");
const router = new express.Router();

const reported_post_model = require("../models/reported_post_model");
const auth = require("../middleware/auth");

//get reported posts
router.get('/reportedpost/showall', auth.verify_admin, function (req, res) {
        reported_post_model.find()
                .then(function (data) {
                        res.status(201).json({ success: true, data: data })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                })
})

// add reported posts to db
router.post('/addreported_post', auth.verify_user, function (req, res) {

        const reported_post_id = req.body.reported_post_id;
        const tag = req.body.tag;
        const content = req.body.content;
        const date = req.body.date
        const user_full_name = req.body.user_full_name;
        const reported_by_full_name = req.user_data.full_name

        var mydata = new reported_post_model({
                reported_post_id: reported_post_id,
                tag: tag,
                content: content,
                date: date,
                user_full_name: user_full_name,
                reported_by_full_name: reported_by_full_name
        })

        mydata.save()
                .then(function () {
                        res.status(201).json({ success: true, message: "reported_post added!" })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                })
})

// remove reported posts
router.delete('/removereported_post/:id', function (req, res) {
        const id = req.params.id;
        reported_post_model.findOneAndDelete({reported_post_id: id })
                .then(function (result) {
                        res.status(201).json({ success: true, message: "reported_post deleted!" })
                })
                .catch(function (e) {
                        res.status(500).json({ message: e })
                });

})

module.exports = router