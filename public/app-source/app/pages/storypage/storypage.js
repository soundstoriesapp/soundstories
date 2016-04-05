define(['mtemplate!app/pages/storypage/storypage.mustache',  'basecontroller', 'jplayer'],
	
function(template, BaseController){

BaseController.extend('Page.Storypage',
/* @Static */
{
	
},
/* @Prototype */
{
	html : null,
	template : template,
	navbarOptions : {
		
	},
	init : function(element, options){
		this._super(element, options);
		
		
		
	},
	
	getData : function(){
		return {
			
		}
	},
	preRender : function(data){
		//this.navbarOptions.title = this.options.product.name;
	},
	postRender : function(){
		var story = this.options.story;
		if(!story.hasAccess){
			console.log('no access');
			return;
		}


	},
	'.jp-play click' : function(el,ev){
		ev.stop();
		var story = this.options.story;
		if(story.hasAccess)
			App.player.playStory(this.options.story);
		else{
			var pageOptions = {
					callback : function(){
						//App.loadPage('storypage', {story : story}, false);
						FM7App.closeModal('.popup');
					}, 
					message : 'Denna kräver att du är inloggad'}
			App.openPopup(Page.Login, pageOptions);
		}
			
	},
	'.jp-pause click' : function(el,ev){
		ev.stop();
		App.player.pause();
	
	},
	'.input-slider input change' : function(el,ev){
		var val = el.val();
		console.log('input change ' + val);
		App.player.setTime(Number(val));
	}

});



})
