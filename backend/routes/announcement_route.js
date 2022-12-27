
const express = require("express");
const router = new express.Router();

const announcement_model = require("../models/announcement_model");
const auth = require("../middleware/auth");

//show all announcement
router.get('/ann/showall',  function(req,res){
        announcement_model.find()
        .then(function(data){
              res.status(201).json({success : true, data: data})
        })
        .catch(function(e){
                res.status(500).json({message : e})
        })        
})

//get announcement
router.get("/ann/:id", function(req, res){
        const id = req.params.id;
        announcement_model.findById(id)
        .then(function(result){
                res.status(201).json({success: true, data: result, message : "Found!"})
        })
        .catch(function(e){
                res.status(500).json({message : e})
        });
})
// add announcement by admin
router.post("/addann", auth.verify_admin, function (req, res) {

        //get readable date
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

        var date1 = dd + '/' + mm + '/' + yyyy + " " + formatAMPM(new Date);

        const tag = req.body.tag;
        const content = req.body.content;
        const date = date1
        const admin_id = req.admin_data._id;

        var mydata = new announcement_model({
                tag: tag,
                content: content,
                date : date,
                admin: admin_id,
        });

        mydata.save()
                .then(function () {
                        res.status(201).json({ message: "Announcement added!" });
                })
                .catch(function (e) {
                        res.status(500).json({ message: e });
                });
});

//update announcement
router.put("/updateann/:id", auth.verify_admin, function (req, res) {

        const id = req.params.id;
        const update = {
                "$set": {
                        "tag": req.body.tag,
                        "content": req.body.content,
                },
        };
        const option = {
                returnNewDocument: false,
        };

        announcement_model
                .findOneAndUpdate({ _id: id }, update, option) // (query, update, option)
                .then(function (result) {
                        res.status(201).json({ message: "Announcement updated!" });
                })
                .catch(function (e) {
                        res.status(500).json({ message: e });
                });
});

router.delete("/deleteann/:id", auth.verify_admin, function (req, res) {
        const id = req.params.id;
        announcement_model
                .findOneAndDelete({ _id: id })
                .then(function (result) {
                        res.status(201).json({ message: "Annoucement deleted!" });
                })
                .catch(function (e) {
                        res.status(500).json({ message: e });
                });
});

module.exports = router;
