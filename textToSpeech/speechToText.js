var express = require("express");
var ap = express();

var path = require("path");

app.use(express.static(path.join(__dirname, "../clinet")));      //

app.listen(8000, function() {
    console.log("Listening on Port 8000");
})

console.log(path.join(__dirname, "../client"));