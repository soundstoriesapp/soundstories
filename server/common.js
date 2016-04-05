var Deferred = require("JQDeferred"),
_ = require("lodash");

var DEBUG_TIMEOUT = 0;
var C = {



	findNumber : function(text, regex){
		var match = regex.exec(text);
		if(match){
			var n = match[0].replace(/[^0-9]/gi, '');
			return parseInt(n, 10);
		}
	},

	assert : function(test, message){
		if(!test){
			message = message || "Technical Error";
			throw new Error(message);
		}
	},

	queryToDFD : function(query){
		var dfd = new Deferred();
		query.exec().then(function(result){

					//console.log('resolve dfd');
					dfd.resolve(result);

				});
		return dfd.promise();
	},


	queryMap : function(queryMap){
		var self = this;
		var dfdMap = Deferred();
		var deffereds_array = [];
		var keys_array = [];
		_.map(queryMap, function(query, key) {
			deffereds_array.push(self.queryToDFD(query));
			keys_array.push(key);
		});
		Deferred.when.apply(null, deffereds_array).done(function(){
			var args = arguments;
			var resultMap = {};
			_.each(args, function(r, index){

				var key = keys_array[index];
				if(key){
					resultMap[key] = r;
				}
			});

			dfdMap.resolve(resultMap);
		}).fail(function(a,b,c){
			dfdMap.reject();
		});

		return dfdMap;
	},







	/**
	 * Arguments : functions with callback on form callback(err, result)
	 */
 	callWhen : function(){
	 	var arrayOfPromises = _.isArray(arguments[0]) ? arguments[0] : arguments;
	 	var dfds = _.map(arrayOfPromises,function(call){
	 		var dfd = new Deferred();

	 		call(function(err,result){
	 			if(err){
	 				dfd.reject([err,result]);
	 			} else {
	 				dfd.resolve(result);
	 			}
	 		});

	 		return dfd;
	 	});

	 	return Deferred.when.apply(null,dfds);
	},

	error : function(error){
		return new Promise(function(resolve, reject){
			reject(error);
		});
	},
	
	handleError : function(req, res, error){
		var userInfo = req.user?'UserId '+req.user.id+': ':'';
		console.error(userInfo + error.message);
		
		if(error.stack){
			console.error(error, error.stack.split("\n"));
		}
		return res.status(400).json({message : error.message});
	},
	
	toJson : function(model, toJson){
		if(_.isArray(model)){
			var list = [];
			_.each(model, function(item){
				list.push(toJson(item));
			})
			return list;
		}else{
			return toJson(model);
		}
	},
	
	response : function(req, res, promise, toJson){
	 	
		promise.then(function(result){
	 		setTimeout(function(){
	 			if(toJson){
	 				result = C.toJson(result, toJson);
	 			}
	 			res.json(result);
	 		}, DEBUG_TIMEOUT);
	 	}).catch(function(error){
	 		C.handleError(req, res, error);
	 	});
	}
}

module.exports = C;
