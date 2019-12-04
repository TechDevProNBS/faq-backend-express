var express = require("express");
var session = require("express-session");
var mysqlQ = require("./dbConnect.js");
var bodyparser = require("body-parser");
var router = express.Router()
var cors = require("cors");
var con = mysqlQ();
var app = express();
app.use(session({ secret: 'Secretses Hobbitses' }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

router.use(function (req, res, next) {
    console.log("Comments main route")
    next()
})

//POST REQUEST FOR COMMENTS
router.post('/PostC',function(req,res){
    let comment = req.body.comment
    let userID = req.body.userID
    let a_id = req.body.a_id
    con.connect(function(err){
        con.query(`insert into comments values(0,'${comment}',${userID},${a_id},CURRENT_TIMESTAMP())`,function(err, results){
            res.send(results)
        })
    })
})
//PUT REQUEST FOR COMMENTS


//GET REQUEST FOR COMMENTS


//DELETE REQUEST FOR COMMENTS
router.delete('/DelC',function(req,res){
    let c_id = req.body.c_id
    con.connect(function(err){
        con.query(`delete from comments where c_id = ${c_id}`,function(err, results){
            res.send(results)
        })
    })
})