var express = require('express');
var bodyParser = require('body-parser');
var cors = require ('cors');
var app = express();
var router = express.Router();
var http = require('http');
var https = require('https');

app.use(cors());
app.use(express.static('public'));
app.use (bodyParser.json());

app.get('/testHttp/', function (req, res) {
	console.log("test1");
  
  // works with localhost, but not with 
  var options = {
    host: "api.dialogflow.com",
    path: "/v1/query?v=20150910&contexts=shop&lang=de&query=Hallo&sessionId=12345",
    //method: 'GET',
    //port: 8080,
    headers:{
       Authorization: 'Bearer e742e0110c1c492faf7f9f85c09bdf27'            
    }
  }

	// oft muss man von einem String in JSON-Daten umwandeln oder andersherum
	// res.send(JSON.stringify(data));
  https.get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      console.log(JSON.parse(data));
    })
  }).on('error', (err) => {
    console.log("Error:" + err.message);
  });


	res.send("test");
});



app.listen(8080);
