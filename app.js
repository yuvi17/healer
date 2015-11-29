
// including all the required modules for namely express, body-parser, mongoose and fs for file handling.

var express = require('express');  // include express module
 
var app = express();

var bodyParser = require("body-parser");  // include body-parser

var fs = require('fs');					// include fs for file handling

var mongoose = require('mongoose');     // include mongoose for database connection

var session = require('express-session');  // include session handling module


mongoose.connect('mongodb://localhost:27017/healerDB');  // connect to MongoDB

mongoose.connection.once('open', function() {

  console.log("database connection open success"); // connected to database successfully

});

app.set("view engine","jade"); // setting up jade as the view engine of the document.

app.use(bodyParser.urlencoded({extended : true})) // enable urlencoded format.

app.use(bodyParser.json());


app.use(express.static('assets')); // hope this works

app.use(session(
	{
		secret:"yj171295",
		resave: true,
    	saveUninitialized: true
	}
));  // initialize session and use a secret key

// code to include models and controllers and views

var models_path='./models';

fs.readdirSync(models_path).forEach(function(file) {    // including models in the app
	if(~file.indexOf('js'))
		require(models_path+'/'+file);
});

// controllers 

fs.readdirSync('./controllers').forEach(function(file)   // including controller in the app
{
	if(file.substr(-3) == ".js"){
		var route = require('./controllers/'+file);
		route.controller(app);
	}
}) 		;

app.get('', function (request, response){
	response.render('index.jade',{err:null});

})

// command to start the server at port 8080, any port can be used if free.

app.listen(8080, function(){
	console.log("Node Server Using Express Running at Port 8080"); // server started successfully
});