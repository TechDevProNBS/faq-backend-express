var express = require("express");
var session = require("express-session");
var mysqlQ = require("./dbConnect.js");
var bodyparser = require("body-parser");
var router = express.Router();
var cors = require("cors");
var con = mysqlQ();
var app = express();
app.use(session({ secret: 'Secretses Hobbitses' }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

router.use(function (req, res, next) {
    console.log("answers main route")
    next()
})

//get requests for answers in order of highest rating

router.get('/RecentA', function (req, res) {
    let q_id = req.body.q_id
    con.connect(function (err) {
        con.query(`select * from answers a LEFT JOIN answerrating ar ON a.a_id = ar.a_id WHERE a.q_id = ${q_id} ORDER by ar.rating desc`, function (err, results) {
            res.send(results)
        })
    })
})

//Delete requests for answers DELETING FROM RATING TABLE FIRST
router.delete('/DelA', function (req, res) {
    let a_id = req.body.a_id
    con.connect(function (err) {
        con.query(`delete from answerrating where a_id = ${a_id}`, function (err, results) {
        })
        con.query(`delete from answers where a_id = ${a_id}`, function (err, results) {
            res.send({ response: "answer deleted" })
        })
    })
})

//put request for answers
router.put('/UpdateA', function (req, res) {
    let updA = req.body.updA
    let a_id = req.body.a_id
    con.connect(function (err) {
        con.query(`Update answers SET answer = "${updA}" WHERE a_id = ${a_id}`, function (err, results) {
            res.send(results)
        })
    })
})

//POST REQUEST FOR ANSWERS
router.post('/PostA', function (req, res) {
    let answer = req.body.answer
    let q_id = req.body.q_id
    let u_id = req.body.u_id
    con.connect(function (err) {
        con.query(`insert into answers values(0,'${answer}','${u_id}','${q_id}',CURRENT_TIMESTAMP())`, function (err, results) {
            if (err) { console.log(err) }
            res.send(results)
        })
    })
})



module.exports = router