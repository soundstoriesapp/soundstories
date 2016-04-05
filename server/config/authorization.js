
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  
  if (req.isAuthenticated()) return next()
  if (req.method == 'GET') req.session.returnTo = req.originalUrl
  res.json({code : 'login required'}, 403);
}
exports.requiresAdmin = function (req, res, next) {
	  
	  if (req.isAuthenticated() && req.user.hasPermission('admin')){
		  
		  return next()
	  } 
		  
	  if (req.method == 'GET') req.session.returnTo = req.originalUrl
	  res.json({code : 'admin required'}, 403);
	}

/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/users/' + req.profile.id)
    }
    next()
  }
}

