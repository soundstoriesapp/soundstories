define(['mtemplate!app/pages/adminstory/adminstory.mustache',
        'basecontroller'],
	
function(template, BaseController){

BaseController.extend('Page.Adminstory',
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
			categories : Category.getAll()
		}
	},
	preRender : function(data){
		//this.navbarOptions.title = this.options.product.name;
		this.options.story.backup();
	},
	postRender : function(){
		var page = this.element[0];
		FM7App.initPage(page);
	},
	'#save click' : function(el,ev){
		ev.stop();
		var self = this;
		this.options.story.save().done(function(){
			self.uploadFile().done(function(){
				self.file = null;
				App.mainView.back();
			});
			
		});
		
	},
	'#delete click' : function(el,ev){
		ev.stop();
		var self = this;
		
		FM7App.modal({
            text: 'Är du säker att du vill radera?',
            title: 'Radera',
            buttons: [
                {text: 'Avbryt'},
                {text: 'OK', bold: true, 
                	onClick: function(){
                		self.options.story.destroy().done(function(){
            				App.mainView.back();
            			});
                	}}
            ]
        });
		
	},
	'#cancel click' : function(el,ev){
		ev.stop();
		this.options.story.restore();
		App.mainView.back();
		
	},
	uploadFile : function(){
		
		if(this.file==null){
			return can.Deferred().resolve();
		}
		
		var data = new FormData();
		var file = this.file;
		var filename = this.options.story._id;
		data.append(filename, file);
		
	    return $.ajax({
	        url: '/mp3upload',
	        type: 'POST',
	        data: data,
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	        success: function(data, textStatus, jqXHR)
	        {
	        	if(typeof data.error === 'undefined')
	        	{
	        		// Success so call function to process the form
	        		//submitForm(event, data);
	        		console.log('success');
	        	}
	        	else
	        	{
	        		// Handle errors here
	        		console.log('ERRORS: ' + data.error);
	        	}
	        },
	        error: function(jqXHR, textStatus, errorThrown)
	        {
	        	// Handle errors here
	        	console.log('ERRORS: ' + textStatus);
	        	// STOP LOADING SPINNER
	        }
	    });
	
	},
	'#fileinput change' : function(el,ev){
		console.log('fileinput change');
		this.file = event.target.files[0];
		
		this.options.story.attr('mp3file', this.file.name);
	},
	'#mp3-filename click' : function(el,ev){
		ev.stop();
		this.element.find('#fileinput').click();
	}

});



})
