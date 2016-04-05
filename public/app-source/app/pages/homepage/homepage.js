define(['mtemplate!app/pages/homepage/homepage.mustache',
        'basecontroller',
        'app/pages/homepage/homepagemodel'],
	
function(template, BaseController){

BaseController.extend('Page.Homepage',
/* @Static */
{
	
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
			model : HomePageModel.get(),
			categories : Category.getAll()
		}
	},
	
	preRender : function(options){
		options.attr('categories', options.categories.getActive()); 
	},
	postRender : function(){
		FM7App.slider('.slider-container', {
			spaceBetween: 10,
			slidesPerView : 3
		});
	},
	
	'.story click' : function(el,ev){
		ev.stop();
		
		var story = el.data('model');
		App.openStoryPage(story);
	},
	'.category click' : function(el,ev){
		ev.stop();
		var category = el.model();
		App.openPage(Page.Storiespage, {
			request : {type : 'category', categoryId : category.id},
			title : category.name
		})
	},
	'a#navigate-to-more click' : function(el,ev){
		ev.stop();
		var list = el.closest('.story-list')
		
		var type = list.attr('storytype');
		App.openPage(Page.Storiespage, {
			request : {type : type},
			title : App.typeName(type)
		})
		
	},
	'#my-material-box click' : function(el,ev){
		ev.stop();
		App.openPage(Page.Adminstories, {});
		//this.options.model.sync();
	},
	'{Profile} update' : function(Profile, el,ev){
		console.log('login triggered');
		this.options.model.sync();
	}

});



})
