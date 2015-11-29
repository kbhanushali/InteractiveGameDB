var express = require("express");
var app = express();


app.get("/",function(req,res){
        res.send("<h1>Hello from EC2</h1>");
});

app.listen(80);
