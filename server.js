var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var passport = require('passport');
var session = require('express-session'); //used by passport to id/store user session

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: '1234'}));

require('./config/passport')(app);

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', function(req,res){
	
});

app.listen(port, function(err) {
    console.log('All the magic happening on ' + port);
});