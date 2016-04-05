define(['common/basemodel'],
function(){


BaseModel.extend('Productrequest',
/* @Static */
{

	
},
/* @Prototype */
{
	serialize : function(){
		var result = this._super();
		delete result.category;
		return result;
	},
	define : {
		categoryId : {
			set : function(categoryId){
				var self = this;
				if(this.category && this.category.id == categoryId){
					return categoryId;
				}
				Category.getAll().done(function(categories){
					self.attr('category', categories.findById(categoryId));
				});
				return categoryId;
			}
		}
	}
	

});



})
