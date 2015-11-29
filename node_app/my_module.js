exports.findProductByUrl = function(res, connection, url, callback) {
	var cat = "";

	connection.findOne({"objectUrl": url}, function(err, result) {
		if(err){
			console.log("Error in findProductByUrl : \n" + err);
			res.send('<strong style="color:red;">Sorry !! Error in fetching product details !! <strong><hr/>');
			db.close();
		} else if(result) {
			 cat = result.itemId;
			 cat = cat + ("#");
			 cat = cat + (result.objectName);
			 cat = cat + ("#");
			 cat = cat + (result.objectDesc);
			 cat = cat + ("#");
			 cat = cat + (result.objectPrice);
			 cat = cat + ("#");
			 cat = cat + (result.objectUrl);
			 cat = cat + ("#");
			 cat = cat + (result.objectImageOne);
			 callback(err, res, cat, url);
		} else  {
			res.send('<strong style="color:red;">Sorry !! No such product found !! <strong><hr/>');
		}
	});
}

exports.callback = function(err, res, cat, url) {
	if(err){
		console.log("Error in callback : \n" + err);
		res.send('<strong style="color:red;">Sorry !! Error in displaying product details !! <strong><hr/>');
	}
	else if(cat) {
		var key = url;
		var redisdata = cat;
		
		redis_client.exists(key, function(err, reply) {
			if(err){
				console.log("Error in redis_client.exists : \n" + err);
			}
			if(reply != 1) {
				redis_client.set(key, redisdata, function(err, reply) {
					console.log("Record added to redis cache : \n"+cat);
					res.send('<strong>Product Details : <strong><hr/><em>' + cat + '</em>');
				});
			}
		});
	}
}