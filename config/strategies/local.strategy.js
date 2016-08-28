var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	mongodb = require('mongodb');


module.exports = function(){
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done){
		var url = 'mongodb://localhost:27017/reAustin';
		mongodb.connect(url, function(err,db){
			var collection = db.collection('users');
				collection.findOne({
					username: email
				},
				function(err,results){
					if(results.password === password){
						var user = results;
						done(null,user);
					}
					else{
						done(null, false, {message: 'Bad Password'});
					}
				}
			);
		});
	}));
};
