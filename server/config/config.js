
/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var production = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + './../../')
};

/**
 * Expose
 */
console.log(process.env.NODE_ENV)
module.exports = {
  development: extend(development, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV];
