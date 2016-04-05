
/**
 * Module dependencies.
 */


var mongoose = require('mongoose'),
_ = require('lodash'),
auth = require('../config/authorization'),
Story = mongoose.model('Story'),
C = require("../common");

/**
 * Expose
 */




module.exports = function (app) {


	
	function storyResponse(user, stories){
		var result = [];
		_.each(stories, function(story){
			result.push(story.toPublicJson(user));
		})
		return result;
	}
	
	
	function getQuery(type, request){
		var base = {active : true};
		switch(type){
		case 'free' : base.free = true;
			break;
		case 'category' : base.categoryId = request.categoryId;
			break;
		}
		var query = Story.find(base).sort('-published');
		return query;
	}

	app.post('/story/all', function(req, res){
		console.log('products');
		
		
		
		var request = req.body, 
		query = getQuery(request.type, request);
		
		query.exec().then(function(result){
			console.log('found ' + result.length + ' products');
			res.json(storyResponse(req.user, result));
		});

	});

	app.post('/homepage', function(req, res){
		console.log('products');

		var queries = {
				latest : getQuery('latest'),
				free : getQuery('free')
		}
		
		_.map(queries, function(query){
			query.limit(3)
		})
		
		C.queryMap(queries).done(function(result){
		
			
			_.map(result, function(list, key){
				var r = storyResponse(req.user, list);
				result[key] = r;
			});
			res.json(result);
			
		});
		/*
		Story.find({}).exec().then(function(result){
			console.log('found ' + result.length + ' products');
			res.json({latest : result});
		});
		 */
	});



	app.get('/story/adminstories', auth.requiresLogin, function(req, res){

		var storyRequest = {}, user = req.user;
		if(user.hasPermission('admin')){
			
		}else{
			storyRequest.createdBy = user._id;
		}
		//Story.find(storyRequest).populate('createdBy')
		Story.find(storyRequest).sort('-published').exec().then(function(result){
			var jsonResult = [];
			_.each(result, function(story){
				var s = story.toObject();
				if(s.createdBy && s.createdBy.email){
					s.createdByEmail = s.createdBy.email;
					delete s.createdBy;
				}
				jsonResult.push(s);
				
			});
			
			console.log('found ' + result.length + ' products');
			res.json(jsonResult);
		});

	});

	app.post('/story', auth.requiresLogin, function(req,res){
		console.log(req.body)

		var json = req.body, user = req.user;
		json.createdBy = user._id;

		var story = new Story(json);

		story.save(function(err, result){
			if(err){
				console.error(err);
				res.json('ERROR');
				return;
			}
			res.json(result);
		});

	});


	app.delete('/story', auth.requiresLogin, function(req,res){
		console.log(req.body)

		var id = req.body._id;

		Story.findById(id, function (err, story) {
			if (err) {
				return res.json({code: 'error'}, 400);

			}

			story.remove(function(err, result){
				if(err){
					return res.json({code: 'error'}, 400);
				}
				return res.json({});
			});
		})


	});


	app.put('/story', auth.requiresLogin, function(req,res){
		var story = req.body;
		if(!story._id){
			console.error('could not find id');
			res.json({code: 'could not find id'}, 400);
			return;
		}


		Story.findOneAndUpdate({_id : story._id}, story, function(err, result){
			if(err){
				console.error(err);

				res.json({code: 'error'}, 400);
				return;
			}
			res.json(result);
		});



	});





};
