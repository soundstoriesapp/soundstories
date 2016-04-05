define(['mtemplate!app/pages/adminusers/adminusers.mustache',
        'basecontroller'],
	
function(template, BaseController){

BaseController.extend('Page.Adminusers',
/* @Static */
{
	requiresLogin : true
},
/* @Prototype */
{
	
	template : template,

	getData : function(){
		return {
			users : Model.User.getAll()
		}
	},
	preRender : function(options){
		options.users.each(function(user){
			console.log(user.email);
			console.log(user.created)
		})
	}

});



})
