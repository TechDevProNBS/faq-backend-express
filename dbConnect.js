var mysql=require("mysql");

module.exports=function connection(){

var con = mysql.createConnection({
                                "port":"3306",
                                 "host":"localhost",
                                 "user":"root",
                                 "password":"root",
                                  "database":"groupproject"
                                })

con.connect(function(err){
    if(err) {
        console.log("Error in Connection");
    }
    else {
        console.log("Connected!");
    }
});
return con;
}