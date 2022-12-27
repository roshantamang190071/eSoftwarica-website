
/*
    These takes the token and compares them
    for user verification
*/

const jwt = require("jsonwebtoken")
const user_model = require("../models/user_model")
const admin_model = require("../models/admin_model")

//user authorization
module.exports.verify_user = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'zQB45Sd134_user') //secret key

        user_model.findOne({_id: data.userID})
        .then(function(result){
           req.user_data = result
           next()
        })
        .catch(function(e){
            res.status(401).json({error : e})
        })
    }catch(e) {
        res.status(401).json({error : e})
    }
}

//admin authorization
module.exports.verify_admin = function(req, res, next){
    try{ 
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'zQB45Sd134_admin') //secret key

        admin_model.findOne({_id: data.adminID})
        .then(function(result){
           req.admin_data = result
           next()
        })
        .catch(function(e){
            res.status(401).json({error : e})
        })
    }catch(e) {
        res.status(401).json({error : e})
    }  
}