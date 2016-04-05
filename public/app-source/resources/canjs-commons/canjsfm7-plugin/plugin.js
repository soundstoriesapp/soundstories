define([ 'framework7', 'jquery', 'mtemplate!canjsfm7-plugin/pagebase.mustache', 
         'mtemplate!canjsfm7-plugin/pagenavbar.mustache','mtemplate!canjsfm7-plugin/popupnavbar.mustache'], 
		function(fm7, $, pagebaseTemplate, 
				pageNavbarTemplate, popupNavbarTemplate){


	Framework7.prototype.plugins.canjsPlugin = function (app, params) {
		var overrides = {}, hooks = {};
	
		/**
		 * 
		 * opens a page in the view
		 * 
		 * pageConfig:
		 * - pageController : the controller class, required
		 * - options : options to the controller, optional
		 * - navbarTemplate: The template for the navbar. This is optional, if imitted a default template will be used
		 * - animatePages: defaults to true
		 * - showBackLink: If default navbar template is used, controls wheather back link should be displayed
		 * 
		 */
		app.openPage = function (view, pageConfig){

			var defaults = {animatePages : true, showBackLink : true};
			
			pageConfig = can.extend(defaults, pageConfig);
			pageConfig.options.showBackLink = pageConfig.showBackLink;
			
			view.pageConfig = pageConfig; // pageConfig is needed in the hooks as well, save it temporarly on the view
			view.url = ""; // let the page be loaded, regardless if it was the previous one loaded.
		
		
			pageConfig.content = pagebaseTemplate.render();
			pageConfig.element = $('<div class="page-content"></div>');
			
			
			var controller = new pageConfig.pageController(pageConfig.element, pageConfig.options); 
			
			return controller._preRenderPhase().done(function(){

				view.router.load(pageConfig);
									
			});

		}
		
		hooks.pageBeforeInit = function(pageData){
        	
        	var $page = $(pageData.container);
			
        	var pageConfig = pageData.view.pageConfig;
			
			$page.append(pageConfig.element);
			var controller = $page.find('.page-content').control();
			var navbar = $(pageData.navbarInnerContainer);
			
			
			controller.navbar = navbar;
			if(controller.renderNavbar){
				controller.renderNavbar(navbar);
			}else{
				
				var navbarTemplate = pageConfig.navbarTemplate || params.navbarTemplate || pageNavbarTemplate;
				
				navbar.html(navbarTemplate(controller.options));
			}
			
			
			controller._postRenderPhase();
			pageData.view.pageConfig = null;

        	
        };
		
		
        hooks.pageBeforeRemove = function(pageData){
        	var el = $(pageData.container).find('.page-content');
			var control = el.control();
			control.destroy();
        }

		
        app.openPopup = function(view, pageConfig){
			var self = this;

			var defaults = {
				animatePages : false,
				showBackLink : false,
				navbarTemplate : params.popupNavbarTemplate || popupNavbarTemplate
			}
			pageConfig = can.extend(defaults, pageConfig);

			app.openPage(view, pageConfig).done(function(){
				self.popup('.popup')
			})
			
		};
        
		
		$('.popup').on('closed', function(){
			$('.popup .navbar').html('');
			$('.popup .pages').html('');
		});
		
		
		return {
			hooks : hooks
	    };  
	};
	

	
	
	
	
})