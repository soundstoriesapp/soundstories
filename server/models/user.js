
/*!
 * Module dependencies
 */


var mongoose = require('mongoose');
var userPlugin = require('../muser');
var Schema = mongoose.Schema;
var _ = require('lodash');
var validator = require('validator');
var C = require("../common");
mongoose.Promise = require('bluebird');

/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String, default: '' },
  initials: { type: String, default: '' },
  email: { 
	  type: String, default: '', 
	  set: function(val){
		  return val.toLowerCase();
	  }
  },
  createdDate : {type : Date},
  deleted : {type : Date},
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  permissions : {type : Array, default : []},
  passwordResetToken : {type : String},
  requireConfirmEmail : {type : Boolean},
  invitedBy : {type : String},
  userSettings : {type : Object, default : {}},
  featureToggle : {type : Object, default : {}},
  lastNotificationReadDate : {type : Date}
});

/**
 * User plugin
 */

UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({
	hasPermission : function(permission){
		return _.indexOf(this.permissions, permission)>-1;
	},
	toPublicJson : function(){
		return {
			email : this.email,
			_id : this._id,
			createdDate : this.createdDate
		}
	},
	validateBeforeSignup : function(){
		
		C.assert(this.password.length >= 8, 'The password must be at least 8 characters long');
		C.assert(validator.isEmail(this.email), "The email is not valid");
		
		
	}
});

/**
 * Statics
 */

UserSchema.static({
    toPublicJson : function(user){
        return {
            email : user.email,
            id : user._id,
            name : user.name
        }
    },
    initialsFromName : function(user){
        var name = user.name;
        if(!name ){
            name = user.email;
        }
        if(!name){
            return "";
        }
        
        var parts = name.split(' ');
        var initials = parts[0].substring(0,1);
        if(parts.length>1){
            initials += parts[parts.length-1].substring(0,1);
        }
        initials = initials.toUpperCase();
        return initials;
    }
});

/**
 * Register
 */

mongoose.model('User', UserSchema);
