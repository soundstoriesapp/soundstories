
/**
 * Module dependencies.
 */
 

var mongoose = require('mongoose'),
User = mongoose.model('User'),
validator = require('validator');
/**
 * Expose
 */




module.exports = function (app, passport) {
  
	
  
	function toProfile(user){
		if(user){
			var admin = user.hasPermission('admin');
			return {loggedIn : true, admin : admin};
		}else{
			return {loggedIn : false};
		} 
	}
	
	app.get('/users/get', function(req, res, next){
		
		return res.json(toProfile(req.user));
	});
	
  app.post('/users/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err); }
	    if (!user) { return res.status(400).json({message : 'Email eller lösenord felaktigt'}); }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      return res.json(toProfile(user))
	    });
	  })(req, res, next);
	});
  
  
  
  app.get('/users/logout', function (req, res) {
	  req.logout();
	  res.json(toProfile());
  });
  app.post('/users/signup', function (req, res) {
	  var user = new User(req.body);
	  
	  var error = user.validateBeforeSignup();
	  if(error){
		  return res.status(400).json({message : error});
	  }
	  console.log('signup new user');
	  user.set('createdDate', new Date());
	  user.provider = 'local';
	  user.save(function (err, result) {
	    if (err) {
	    	console.error(err);
	    	return res.status(400).json({message : 'Systemfel'});
	    }
		console.log('signup new user done');
	    // manually login the user once successfully signed up
	    req.logIn(user, function(err) {
	      if (err) return next(err)
	      return res.json(toProfile(user));
	    })
	  })
	});
	
};
