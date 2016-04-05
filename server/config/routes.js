
/**
 * Module dependencies.
 */



/**
 * Expose
 */

module.exports = function (app, passport) {
	require('../controllers/homecontroller')(app, passport);
	
	require('../controllers/testcontroller')(app, passport);
   require('../controllers/usercontroller')(app, passport);
   require('../controllers/storycontroller')(app, passport);
   require('../controllers/mp3controller')(app, passport);
   require('../controllers/adminusercontroller')(app, passport);
 
  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    console.warn('unhandled request for url: '+req.method + ' ' + req.originalUrl);
    /*
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
    */
    res.status(404).json({message : 'Page not Found'});
  });
};
