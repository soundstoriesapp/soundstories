
/**
 * Module dependencies.
 */
 

var mongoose = require('mongoose'),
auth = require('../config/authorization'),
User = mongoose.model('User');
/**
 * Expose
 */




module.exports = function (app) {

	app.get('/test', function(req, res){
		  console.log('test');
		  res.json({test : 'test'});		  
	});
	
	app.get('/testuser', function(req, res){
		  User.find({}).exec().then(function( result){
			  
			  
			  var u = new User({email : 'test2ff', password : 'testtest'});
			  u.save(function(errr, result){
				 console.log('saved'); 
				 res.json({test : 'testfgfgfg'});
			  });
			  
		  });
		  		  
	});
	
	app.get('/testrestrict', auth.requiresLogin, function(req, res){
		  console.log('test');
		  res.json({test : 'testrestrict'});		  
	});

};
