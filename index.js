var fs = require('fs');
var express = require('express');
var passport = require('passport');
var config = require('server/config/config');
var mongoose = require('mongoose');
var app = express();

var server = require('http').Server(app);



app.set('port', (process.env.PORT || 5000));


console.log(config);
//Connect to mongodb

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

console.log('connect to ' + config.db);

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models


fs.readdirSync(__dirname + '/server/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/server/models/' + file);
});

// Bootstrap passport config
require('./server/config/passport')(passport, config);

// Bootstrap application settings
require('./server/config/express')(app, passport);

// Bootstrap routes
require('./server/config/routes')(app, passport);

server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
	
