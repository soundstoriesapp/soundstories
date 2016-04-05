var mongoose = require('mongoose')
  , Schema = mongoose.Schema,
  Deferred = require("JQDeferred"),
  util = require('util');

function BaseSchema() {
  Schema.apply(this, arguments);

  this.add({
    name: String,
    createdAt: Date
  });
  this.methods.saveDFD = function(){
	  var dfd = new Deferred();
	  this.save(function(err, res){
		  if(err){
			  console.log('error');
		  }
		  dfd.resolve(res);
	  });
	  return dfd.promise();
  }
}

util.inherits(BaseSchema, Schema);
module.exports = BaseSchema;