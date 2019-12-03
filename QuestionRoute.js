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
    console.log("questions main route")
    next()
})
//GET REQUESTS FOR QUESTIONS
//get request for most recent questions

router.get('/RecentQ', function (req, res) {
    con.connect(function (err) {
        con.query(`select question, q_id from questions ORDER BY postdate_Q desc`, function (err, results) {
            res.send(results)
        })

    })
})

//get request for questions with no answers
router.get('/UnansweredQ', function (req, res) {
    con.connect(function (err) {
        con.query(`select * from questions q LEFT JOIN answers a ON q.q_id = a.q_id where a.q_id IS NULL ORDER by postdate_Q desc`, function (err, results) {
            if (err) { console.log("inside query" + err) }
            res.send(results)
        })
    })
})

//get request for questions with highest rating and ordered H-L
router.get('/TopRatedQ', function (req, res) {
    con.connect(function (err) {
        con.query(`select * from questions q LEFT JOIN questionrating qr ON q.q_id = qr.q_id WHERE qr.q_id IS NOT NULL ORDER by qr.rating desc`, function (err, results) {
            if (err) { console.log("inside query" + err) }
            res.send(results)
        })
    })
})

//DELETE REQUEST FOR QUESTIONS
router.delete('/DelQ', function (req, res) {
    let q_id = req.body.q_id
    con.connect(function (err) {
        con.query(`delete from questions where q_id = ${q_id}`, function (err, results) {
            res.send({ response: "question deleted" })
        })
    })
})


//POST RREQUEST FOR QUESTIONS

router.post('/PostQ', function (req, res) {
    let question = req.body.question
    let userID = req.body.userID
    con.connect(function (err) {
        con.query(`insert into questions values(0,'${question}',${userID},CURRENT_TIMESTAMP())`, function (err, results) {
            if (err) { console.log(err) }
            res.send(results)
        })
    })

})

module.exports = router

