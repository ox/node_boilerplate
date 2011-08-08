var express = require('express');
var app = express.createServer();

var couch = require('couch-client'),
		db = couch('http://moxie.iriscouch.com/**DB_NAME**'); //your couchdb server here

// set rendering views
app.set('views',__dirname + '/views');
app.set('view engine','jade');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	db.save({
		user: req.connection.remoteAddress,
		action: 'visit',
		date: Date()
	}, function(err,doc){
		if(err) console.log(err);
	});
	res.render('main',{layout: false})
});

app.listen(3000);
