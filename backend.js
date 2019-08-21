// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const https = require('https');
var axios = require('axios');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    var options = {
      host: "api.dialogflow.com",
      path: "/v1/query?v=20150910&contexts=shop&lang=de&query=Hallo&sessionId=12345",
      headers:{
        Authorization: 'Bearer e742e0110c1c492faf7f9f85c09bdf27'            
      }
    }
    https.get(options, (resp) => {
    //https.get("https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=de&query=Hallo&sessionId=12345", (resp) => {

      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        console.log(JSON.parse(data).result.fulfillment.speech);
      })
    }).on('error', (err) => {
      console.log("Error:" + err.message);
    });
    
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/ax', function(req, res) {

  var config = {
    headers: { Authorization: "Bearer " + "e742e0110c1c492faf7f9f85c09bdf27" }
  };

  axios.get('https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=de&query=Hallo&sessionId=12345', config)
  .then(response => {
    console.log("RIGHT");
    console.log(response.data.result.resolvedQuery);
    console.log(response.data.result.fulfillment.speech);
    console.log("RIGHT");
  })
  .catch(error => {
    console.log("WRONG");
    console.log(error);
    console.log("WRONG");
  });
  res.json({ message: 'api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);