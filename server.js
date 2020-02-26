var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Drug = require('./model'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/faf');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.get('/', function (req, res) {
    res.send('<html><body><h1>Hello World</h1></body></html>');
});


//var parse = require('./parser');

//var search = require("./search");

var scrape = require("./scraper");



app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
