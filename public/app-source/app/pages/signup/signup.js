define(['mtemplate!app/pages/signup/signup.mustache',  'basecontroller'],
	
function(template, BaseController){

BaseController.extend('Page.Signup',
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
			profile : App.profile
		}
	},
	preRender : function(data){
		//this.navbarOptions.title = this.options.product.name;
	},
	postRender : function(){
		

	},
	'a#login click' : function(el,ev){
		ev.stop();
		//var data = this.options.profile.serialize();
		this.options.profile.login().done(function(){
			FM7App.closeModal('.popup');
		});
		
	},
	'a#cancel click' : function(el,ev){
		ev.stop();
	
		FM7App.closeModal('.popup');
		
	},
	'a#signup click' : function(el,ev){
		ev.stop();
		
		this.options.profile.signup().done(function(){
			FM7App.closeModal('.popup');
		});
		
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
	}

});



})
