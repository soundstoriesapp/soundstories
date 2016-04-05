define(['mtemplate!app/pages/adminstories/adminstories.mustache',
        'basecontroller'],
	
function(template, BaseController){

BaseController.extend('Page.Adminstories',
/* @Static */
{
	requiresLogin : true
},
/* @Prototype */
{
	html : null,
	template : template,
	
	init : function(element, options){
		this._super(element, options);
		
		var self = this;
		
		
	},

	
	getData : function(){
		return {
			stories : Story.findAdminStories()
		}
	},
	
	'.story click' : function(el,ev){
		ev.stop();
		
		App.openPage(Page.Adminstory, {story : el.data('model')});
	},
	'#create-new click' : function(el,ev){
		ev.stop();
		
		App.openPage(Page.Adminstory, {story : Story.createNew()})
		
		
	},
	'{Story} created' : function(Story, ev, story){
		this.options.stories.push(story);
	}

});



})
