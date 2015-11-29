var express = require('express')
  ,	mongoClient = require('mongodb').MongoClient
  , http = require('http')
  , path = require('path')
  , url = require('url')
  , myModule = require('./my_module.js')
  , config = require('./config.js');

var app = express();

// all environments
app.set('port', 80);

app.use(express.static(__dirname + '/views'));
app.use(express.static('./public'));
app.use('/public', express.static(path.resolve('./public')));

var db;

/*
 * Connection pooling to minimize database overheads
 */
mongoClient.connect("mongodb://"+config.mongo.user_name+":"+config.mongo.password+"@ds059634.mongolab.com:59634/gamedb", function(err, database) {
  if(err)
	throw err;
  db = database;
});

app.get("/", function(req, res) {
	res.render("index");
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
