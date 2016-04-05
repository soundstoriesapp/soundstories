define(['common/basemodel'],
function(){


BaseModel.extend('Model.User',
/* @Static */
{
	
	findAll : function(){
		return C.jsonajax({
 	    	url: "/adminusers/all",
 	    	type : 'POST',
 	    	dataType: 'json'
 	    }).done(function(){
 	    	console.log('got users');
 	    });
	}
},
/* @Prototype */
{
	
	define : {
		createdDate : {
			type : 'date'
		}
	}
});



})
