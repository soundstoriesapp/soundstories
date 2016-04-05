define([ 'app/models/story'],
function(){


BaseModel.extend('HomePageModel',
/* @Static */
{
	_findOne : function(){
		
		return C.jsonajax({
 	    	url: "/homepage",
 	    	dataType: 'json',
 	    	
 	    	type : 'POST'
 	    });
	},
	findOne : function(){
		
		return this._findOne();
	}
	
},
/* @Prototype */
{
	sync : function(){
		var self = this;
		HomePageModel._findOne().done(function(data){
			self.attr(data, true);
		});
	},
	define : {
		free : {
			Type : Story.List
		},
		latest : {
			Type : Story.List
		}
	}

});



})
