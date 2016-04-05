define(['mtemplate!app/pages/adminstart/adminstart.mustache',
        'basecontroller'],
	
function(template, BaseController){

BaseController.extend('Page.Adminstart',
/* @Static */
{
	requiresLogin : true
},
/* @Prototype */
{
	html : null,
	template : template,
	
	

	
	getData : function(){
		return {
			
		}
	}
});



})
