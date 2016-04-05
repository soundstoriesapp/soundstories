
define([
         'mtemplate!app/sitecontainer.html',
         'mtemplate!app/pagenavbar.html',
         'mtemplate!app/popupnavbar.html',
         'canjs-commons/functions',
         'jquery',
     	 'can/view/mustache', 
     	 'canjs-commons/extensions',
         'can/util/library', 
         'can/control/route', 
         'can/model',      
         'can/component',
         'can/control',
         'can/route',
         'can/map/delegate',
         'can/construct/super',
         'can/construct/proxy',
         'can/control/plugin',
         'can/list',
         'can/map/backup',
         'can/map/define',
         'can/map/validations',
         
         'framework7',
         'sugar',
         
         'canjs-commons/extensions',
         
         'canjsfm7-plugin/plugin',
         
         'app/pages',
         'app/models',
         'app/models/fixtures',
         'app/mustachehelpers',
         'app/appcommon',
         'app/player'
         
         
         ], function(template, navbarTemplate, popupNavbarTemplate, Functions) {
	

	
	
	can.Control.extend('AppControl',{
		
	},{
		init : function(){
			var self = this;
			Profile.get().done(function(profile){
				
				
				var player = new Player();
				
				self.element.find('body').append(template({player : player}));
				player.initPlayer();
				
				FM7App = new Framework7({
					ajaxLinks : '.link',
					swipeBackPage : true,
					debug : true,
					canjsPlugin : {
						navbarTemplate : navbarTemplate,
						popupNavbarTemplate : popupNavbarTemplate
					}
				});
				App = {
					player : player,
					profile : profile,
					
					openPage : function(pageController, options){
						
						
						var config;
						if(typeof pageController === 'object'){
							var config = pageController;
						}else{
							config = {
									pageController : pageController,
									options: options
								}
						}
						
						
						config.options.profile = App.profile;
						
						if(pageController.requiresLogin && !App.profile.loggedIn){
							App.openPopup(Page.Login, {
								message : 'Sidan kräver att du är inloggad',
								callback : function(){
									FM7App.openPage(App.mainView, config);
									FM7App.closeModal('.popup');
								}
							});
							return;
						}
						FM7App.openPage(App.mainView, config);
					},
					openPopup : function(pageController, options){
						var config;
						if(typeof pageController === 'object'){
							var config = pageController;
						}else{
							config = {
									pageController : pageController,
									options: options
								}
						}
						config.options.profile = App.profile;
						FM7App.openPopup(App.popupView, config);
					},
					openStoryPage : function(story){
						if(true || story.hasAccess){
							App.openPage(Page.Storypage, {story : story} );
							
						}else{
							var pageOptions = {
									callback : function(){
										App.loadPage('storypage', {story : story}, false);
										FM7App.closeModal('.popup');
									}, 
									message : 'Denna kräver att du är inloggad'}
							App.openPopup(Page.Login, pageOptions);
						}
					},
					mainView : FM7App.addView('.view-main', {
						dynamicNavbar: true,
						domCache : true
					}),
					popupView : FM7App.addView('.popup > .view', {
						dynamicNavbar: true,
						domCache : true 
					}),
					typeName : function(type){
						switch(type){
						case 'free': return "Gratis";
						case 'latest': return "Senaste";
						}
					}
					
				}
					
				App.mainView.history = []; // Clear index page
				
				
				var startPage = Page.Homepage;
				if(typeof defaultPage !== 'undefined'){
					startPage = Page[can.capitalize(defaultPage)];
				}
				
				
				App.openPage( {pageController : startPage, options : {}, animatePages : false, showBackLink : false});
				
				
			});

			
		
		},
		
		'{window} ajaxerror' : function(el,ev, jqXHR){
			var json = jqXHR.responseJSON;
			if(json && json.message){
				console.log(json.message);
				FM7App.addNotification({
					title : json.message
				})
			}
		},
		
		'.popup .controller close' : function(el,ev){
			
			FM7App.closeModal('.popup');
		},
		'.view-main .controller close' : function(el,ev){
			
			App.mainView.back();
		},
		'.navbar .open-login click' : function(el,ev){
			ev.stop();
			App.openPopup(Page.Login, {});
		},
		'.navbar .playerinfo .box click' : function(el,ev){
			ev.stop();
			App.openPopup(Page.Storypage, {story : App.player.story});
		},
		'a.navigate click' : function(el,ev){
			ev.stop();
			var page = Page[can.capitalize(el.attr('href'))];
			App.openPage(page, {});
			
		}
		
	});
	
	
	
	new AppControl(document, {});
	
	
	
});
