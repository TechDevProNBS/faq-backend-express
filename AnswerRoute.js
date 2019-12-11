var express = require("express");
var session = require("express-session");
var mysqlQ = require("./dbConnect.js");
var bodyparser = require("body-parser");
var router = express.Router();
var cors = require("cors");
var con = mysqlQ();
var app = express();

/** 
 * This code provides functionality to access answers from the backend. Requests include:
 * -Corresponding answers to a question
 * -Answers in order of rating
 * -Delete answer
 * -Post answer
 * -Put answer
 *  */
router.use(function (req, res, next) {
    console.log("answers main route")
    next()
})

/**GET REQUEST FOR ANSWERS
 * @method GET
 * @param {int} q_id question ID
*/
router.get('/CountA/:q_id', function (req, res) {
    let q_id = req.params.q_id
    con.connect(function (err) {
        con.query(`select count(a_id) as hits from answers where q_id = ${q_id}`, function (err, results) {
            res.send(results)
        })
    })
})

/**GET REQUEST FOR ANSWERS IN ORDER OF HIGHEST RATING
 * @method GET
 * @param {int} q_id question ID
 */
router.get('/RecentA/:q_id', function (req, res) {
    let q_id = req.params.q_id
    con.connect(function (err) {
        con.query(`select *,Date_format(postdate_A,'%d/%m/%Y') as niceDate, TIME_FORMAT(postdate_A, "%H:%i:%s") as niceTime from answers a LEFT JOIN answerrating ar ON a.a_id = ar.a_id WHERE a.q_id = ${q_id} ORDER by ar.rating desc`, function (err, results) {
            res.send(results)
        })
    })
})

/**DELETE REQUESTS FOR ANSWERS
 * @method DELETE
 * @param {int} a_id answer ID
 * deletes from the comments table and then the ratings table first because of the primary key links
 */
router.delete('/DelA/:a_id', function (req, res) {
    let a_id = req.params.a_id
    con.connect(function (err) {
        con.query(`delete from comments where a_id = ${a_id}`, function (err, results) {
        })
        con.query(`delete from answerrating where a_id = ${a_id}`, function (err, results) {
        })
        con.query(`delete from answers where a_id = ${a_id}`, function (err, results) {
            res.send({ response: "answer deleted" })
        })
    })
})

/**PUT REQUEST FOR ANSWERS 
 * @method PUT
 * @param {string} updA new comment to replace the existing one
 * @param {int} a_id answer ID
*/
router.put('/UpdateA', function (req, res) {
    let updA = req.body.updA
    let a_id = req.body.a_id
    console.log(updA + " " + a_id )
    console.log(updA +" " + a_id)
    con.connect(function (err) {
        con.query(`Update answers SET answer = "${updA}" WHERE a_id = ${a_id}`, function (err, results) {
            res.send(results)
        })
    })
})

/**POST REQUEST FOR ANSWERS 
 * @method POST
 * @param {string} answer answer itself to be posted
 * @param {int} q_id question ID
 * @param {int} u_id user ID
*/
router.post('/PostA', function (req, res) {
    let answer = req.body.answer
    let q_id = req.body.q_id
    let u_id = req.body.u_id
    var returnedID = ""
    con.connect(function (err) {
        con.query(`insert into answers values(0,'${answer}','${u_id}','${q_id}',CURRENT_TIMESTAMP())`, function (err, results) {
            if (err) { console.log(err) }
            res.send(results)
            returnedID = results.insertId
            console.log(returnedID)
            con.query(`insert into answerrating values(${returnedID},${u_id},0,current_timestamp())`, function (err, results) {
                if (err) { console.log }
            })
        })

    })
})

module.exports = router