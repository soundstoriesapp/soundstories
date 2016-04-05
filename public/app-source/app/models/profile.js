define(['common/basemodel'],
function(){


BaseModel.extend('Profile',
/* @Static */
{
	
	findOne : function(){
	
		return C.jsonajax({
 	    	url: "/users/get",
 	    	dataType: 'json',
 	    	type : 'GET'
 	    });
	}
},
/* @Prototype */
{
	authAction : function(){
		return this.attr('loggedIn') ? 'Logout' : 'Login'
	},

	login : function(){
		var self = this;
		var request = this.serialize();
		return C.jsonajax({
			url : '/users/login',
			data : request
		}).done(function(profile){	
			self.attr(profile);
			can.trigger(Profile, 'update');
		}).fail(function(){
			console.error('failed log in');
		})
	},
	signup : function(){
		var self = this;
		var request = this.serialize();
		return C.jsonajax({
			url : '/users/signup',
			data : request
		}).done(function(profile){
			self.attr(profile);
			can.trigger(Profile, 'update');
		}).fail(function(){
			console.error('failed signup');
		})
	},
	logout : function(){
		var self = this;
		return C.jsonajax({
			url : '/users/logout',
			type : 'GET'
		}).done(function(profile){
			self.attr(profile);
			can.trigger(Profile, 'update');
		}).fail(function(){
			console.error('failed log out');
		})
	}
	

});



})
