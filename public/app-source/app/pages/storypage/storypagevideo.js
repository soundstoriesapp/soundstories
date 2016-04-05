define(['mtemplate!app/pages/storypage/storypagevideo.mustache',  'basecontroller'],
	
function(template, BaseController){

BaseController.extend('Page.Storypagevideo',
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
		var mp3file = this.options.story._id;
		$("#jquery_jplayer_1").jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					title: "Bubble",
					//mp3: "http://jplayer.org/audio/mp3/Miaow-07-Bubble.mp3"
					mp3: '/mp3/' + mp3file
				});
			},
			swfPath: "js",
			supplied: "mp3",
			wmode: "window",
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		});

	}

});



})
