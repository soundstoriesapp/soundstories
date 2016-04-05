define(['common/basemodel'],
function(){


BaseModel.extend('Story',
/* @Static */
{
	id : '_id',
	findAll : function(request){
	
		return C.jsonajax({
 	    	url: "/story/all",
 	    	dataType: 'json',
 	    	data: request,
 	    	type : 'POST'
 	    });
	},
	
	findAdminStories : function(){
		var dfd = can.Deferred();
		var self = this;
		C.jsonajax({
			url : '/story/adminstories',
			type : 'GET'
		}).done(function(items){
			var models = self.models(items);
			dfd.resolve(models);
		});
		return dfd.promise();
		
	},
	
	//create : '/node/story',
	create : function(data){
		console.log('create');
		return C.jsonajax({
			url : '/story',
			data : data
		});
	},
	
	destroy : function(id){
		return C.jsonajax({
			url : '/story',
			data : {
				_id : id
			},
			type : 'DELETE'
		});
	},
	
	update : function(id, data){
		console.log('update');
		return C.jsonajax({
			url : '/story',
			data : data,
			type : 'PUT'
		});
	},
	createNew : function(){
		var result = new Story({
			published : new Date()
		});
		return result;
		
	}
},
/* @Prototype */
{
	playing : false,
	progress : null,
	progressPercent : 0,
	mp3url : function(){
		return '/mp3/' + this._id;
	},
	state : function(){
		return this.attr('playing') ? 'play' : 'pause';
	},
	clearPlaying : function(){
		this.attr('playing', false);
		this.attr('time', null);
	},
	setTime : function(time, length){
		var percent = 100 * time / length;
		
		var d = new Date(2000, 0, 0, 0, 0, time, 0);
		this.attr('progress', d.format('{m}:{ss}'));
		if(percent)
			this.attr('progressPercent', Math.round(percent));
	},
	define : {
		published : {
			type : 'date'
		},
		publishedString : {
			type : 'string',
			get : function(){
				var published = this.attr('published');
				if(published == null){
					return null;
				}
				var result = C.formatDate(published);
			
				return result;
			},
			set : function(val){
				console.log('set publishedDate');
				this.attr('published', C.parseDate(val));
				return val;
			}
		},
		categoryId : {
			type : 'string',
			set : function(val){
				if(val == 'none'){
					return null;
				}
				return val;
			}
		}
	}
	

});



})
