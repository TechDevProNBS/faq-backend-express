var express = require('express')
var questions = require('./QuestionRoute');
var express = require("express");
var bodyparser = require("body-parser");
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// ...

app.use('/Questions', questions);


app.listen(4001);