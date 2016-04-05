define([ 'can/view/mustache',
         'mtemplate!app/partials/item.html'
], function(mustache, itemTemplate){
	
	var partials = {
		'item' : itemTemplate
	}
	
	Mustache.registerHelper('categoryname', function(id){
		Category.getAll().done(function(categories){
			return categories.getOne(id).name;
		});
	});
	
	Mustache.registerHelper('date', function(date){
		date = C.compute(date);
		return C.formatDate(date)
		
	});
	
	Mustache.registerHelper('partial', function(partial, options){
		
		var template = partials[partial];
		
		return template.render(options.context);
		
	});
})