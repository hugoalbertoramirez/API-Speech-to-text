const express = require('express');
const app = express();
let https = require ('https');

var port = 8089;

app.get('/', function (req, res) {
  res.send('Hello World')
});

// get keys in https://azure.microsoft.com/en-us/try/cognitive-services/my-apis/
let accessKey  = "0c140e28fe754315b816691babf92e4e";
let uri = 'westcentralus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/keyPhrases';

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "X-Custom-Header");
  next();
});

app.post('/GetKeyPhrases', function(req, res) {
    

    let response_handler = function (response) {
        let body = '';
        response.on ('data', function (d) {
            body += d;
        });
        response.on ('end', function () {
            let body_ = JSON.parse (body);
            let body__ = JSON.stringify (body_, null, '  ');
            console.log (body__);
        });
        response.on ('error', function (e) {
            console.log ('Error: ' + e.message);
        });
    };

    let get_sentiments = function (documents) {
        let body = JSON.stringify (documents);

        let request_params = {
            method : 'POST',
            hostname : uri,
            path : path,
            headers : {
                'Ocp-Apim-Subscription-Key' : accessKey,
            }
        };

        let req = https.request (request_params, response_handler);
        req.write (body);
        req.end ();
    }

    console.log(">>>" + req);
    //var documents = JSON.parse(req.body);
    // console.log(documents);
    //res.send( get_sentiments(documents) );
});

app.listen(port);
console.log('Server online en puerto: ' + port);   

