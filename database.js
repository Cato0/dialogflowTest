var express = require("express");
var mysql = require("mysql");

var app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Dialogflow"
});

db.connect(function() {

    if(error) {
        console.log("Error");
    }
    else {
        console.log("Connected");
    }
});



app.get("/", function(req, resp) {
    //connection.query("SELECT * FROM DATABASE WHERE THIS = THAT")
});

app.listen(1337);