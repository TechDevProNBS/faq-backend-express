var mysql=require("mysql");
let allConfig = require('./config.js');
let profile = allConfig.currentProfile;
let config = allConfig[profile];


module.exports=function connection(){
    let database = config.database;

var con = mysql.createConnection({
                                "port":"3306",
                                 "host":database.host,
                                 "user":database.user,
<<<<<<< HEAD
                                 "password":databse.password,
=======
                                 "password":database.password,
>>>>>>> 01dfa9c07b070f6984b2a41f732a5f25186908ee
                                  "database":database.name
                                })

con.connect(function(err){
    if(err) {
        console.log("Error in Connection" + err);
    }
    else {
        console.log("Connected!");
    }
});
return con;
}
