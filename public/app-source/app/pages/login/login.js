define(['mtemplate!app/pages/login/login.mustache',  'basecontroller'],
	
function(template, BaseController){

BaseController.extend('Page.Login',
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
		
		
		this.options.request = new can.Map({email : "test", password : "test"});
	},
	
	getData : function(){
		
	},
	preRender : function(data){
		//this.navbarOptions.title = this.options.product.name;
		this.options.message = this.options.message || 'Logga in';
	},
	postRender : function(){
		

	},
	'a#login click' : function(el,ev){
		ev.stop();
		//var data = this.options.profile.serialize();
		var self = this;
		this.element.find('input').blur();
		this.options.profile.login().done(function(){
			if(self.options.callback){
				self.options.callback();
			}else{
				FM7App.closeModal('.popup');
			}
			
		});
		
	},
	'a#to-signup click' : function(el,ev){
		ev.stop();
		
		FM7App.openPage(App.popupView, {
			pageController : Page.Signup,
			options : {}
		})
		
		
	},
	'a#cancel click' : function(el,ev){
		ev.stop();
	
		FM7App.closeModal('.popup');
		
	},
	'a#signup click' : function(el,ev){
		ev.stop();
		var data = this.options.request.serialize();

		C.jsonajax({
			url : '/users/signup',
			data : data
		}).done(function(result){
			console.log('signup');
		})
	},
	'a#restricted click' : function(el,ev){
		ev.stop();
		C.jsonajax({
			url : '/testrestrict',
			type : 'GET'
		}).done(function(result){
			alert(result);
		})
	},
	'a#logout click' : function(el,ev){
		ev.stop();
		this.options.profile.logout();
	},
	'a.navigate click' : function(el,ev){
		ev.stop();
		var page = el.attr('href');
		FM7App.loadPage(FM7App.mainView, page , false);
		FM7App.closeModal('.popup');
	}

});



})
