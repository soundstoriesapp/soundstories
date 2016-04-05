define(['mtemplate!app/pages/storiespage/storiespage.mustache',  'basecontroller'],
	
function(template, BaseController){

BaseController.extend('Page.Storiespage',
/* @Static */
{
	defaults : {
		request : {}
	}
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
			stories : Story.getAll(this.options.request)
		}
	},
	
	preRender : function(options){
		var r = options.request;
	},
	
	'.story click' : function(el,ev){
		ev.stop();
		var story = el.data('model');
		App.openStoryPage(story);
	
	}

});



})
