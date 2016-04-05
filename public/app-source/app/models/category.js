define(['common/basemodel'],
function(){


BaseModel.extend('Category',
/* @Static */
{

	json : [{name : 'ingen', id:'none'},
	        {name : 'Kategori 1', id:'kategori1'}, 
	        {name: 'Kategori 2', id:'kategori2'},
	        {name: 'Kategori 3', id:'kategori3'}],
	findAll : function(){
		var dfd = can.Deferred();
		
		var result = this.models(this.json);
		
		return dfd.resolve(result);
	}
},
/* @Prototype */
{
	
	

});
Category.List = Category.List.extend({
    findById : function(id){
    	return this.filter(function(category){
			return category.id == id;
		})[0];
    },
    getActive : function(){
    	return this.filter(function(category){
    		return category.id != 'none';
    	});
    }
})



})
