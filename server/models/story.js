/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema,
  Deferred = require("JQDeferred"),
  BaseSchema = require('./baseschema'),
  util = require('util');
  

/**
 * Product Schema
 */



var StorySchema = new BaseSchema({
  title: {type: String, default:''},
  description : {type: String, default:''},
  mp3file : {type: String, default: ''},
  text : {type : String},
  published : {type: Date, default: new Date()},
  active : {type: Boolean, default : false},
  createdBy : {type: String, ref : 'User'},
  free : {type : Boolean, default: false},
  categoryId : {type : String}
})


StorySchema.method({
	toPublicJson : function(user){
		var story = this;
		var result = {
			_id : story._id,
			hasAccess : user!=null || story.free,
			title : story.title,
			description : story.description
		};
		return result;
	}
});

/**
 * Methods
 */





mongoose.model('Story', StorySchema)
