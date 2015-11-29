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
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());

var db;

/*
 * Connection pooling to minimize database overheads
 */
mongoClient.connect("mongodb://"+config.mongo.user_name+":"+config.mongo.password+"@ds059634.mongolab.com:59634/gamedb", function(err, database) {
  if(err)
	throw err;
  db = database;
});


app.get("/", function(req, res){
		res.render('index');
});


//----------game Page Home Catalog-------------
app.get("/gameCatalog", function(req, res){
	var collection = db.collection('games');
	collection.find().toArray(function(err, results) {
		res.render('categories', { products: results });
	});
});


//----------Redirect to each category page---------------
app.get("/gameCatalog/:category",	function(req, res) {
		var categoryLocal = req.params.category;
		var collection = db.collection('games');
		collection.find({category: categoryLocal}).toArray(function(err, results) {
			res.render('gameCategory', { games: results, categoryName: categoryLocal});
		});
});


//----------Redirect to each product page-------------
app.get("/gameCatalog/:category/:gameId",	function(req, res) {
		var categoryLocal = req.params.category;
		var productIdLocal = req.params.productId;
		var collection = db.collection('games');
		
		collection.find({productCategory: categoryLocal, productId: productIdLocal}).toArray(function(err, results) {
			res.render("gameDetails", {product : results[0]});
		});
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
