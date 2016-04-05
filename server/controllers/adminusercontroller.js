
/**
 * Module dependencies.
 */
 

var mongoose = require('mongoose'),
User = mongoose.model('User'),
Story = mongoose.model('Story'),
_ = require('lodash'),
auth = require('../config/authorization'),
validator = require('validator');
/**
 * Expose
 */




module.exports = function (app, passport) {
 
	app.post('/adminusers/all', auth.requiresAdmin, function(req, res){
		
		User.find({}).sort('email').exec().then(function(users){
			var result = [];
			_.each(users, function(user){
				result.push(user.toPublicJson());
			});
			
			res.json(result);
		});
		
	
	});
	
	
  
	
};
