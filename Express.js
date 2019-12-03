var express = require('express')
var questions = require('./QuestionRoute');
var express = require("express");
var app = express();
// ...

app.use('/Questions', questions);


app.listen(4001);