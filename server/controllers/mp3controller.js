
/**
 * Module dependencies.
 */
 

var mongoose = require('mongoose'),
_ = require('underscore'),
fs = require('fs'),
http = require('http'),
url = require('url'),
express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
Story = mongoose.model('Story');

/**
 * Expose
 */




module.exports = function (app) {

	function fileResponse(req, res, mp3file){
		var reqResource = req.params.file;
	    //console.log("Resource: " + reqResource);

	   

        var total = mp3file.length;
        
            
        var range = req.headers.range;

        var positions = range.replace(/bytes=/, "").split("-");
        var start = parseInt(positions[0], 10);
        // if last byte position is not present then it is the last byte of the video file.
        var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        var chunksize = (end-start)+1;

            res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
                                 "Accept-Ranges": "bytes",
                                 "Content-Length": chunksize,
                                 "Content-Type":"audio/mpeg"});
            res.end(mp3file.slice(start, end+1), "binary");

        
	}
	
	app.post('/mp3upload', function(req,res){
		console.log('upload mp3');
		
		for(var name in req.files){
			var file = req.files[name];
			
			fs.readFile(file.path, function (err, data) {
				  console.log(name);
				  
				  var filepath = path.resolve(__dirname,"../../mp3/"+name+".mp3");
				  
				 
				  fs.writeFile(filepath, data, function (err) {
				    res.json('ok')
				  });
			});
		}

		
	});
	
	
	function loadFile(storyId, req, res){
		var file = '../../mp3/' + storyId + '.mp3';
		
		var dir = __dirname;
		
		var filepath = path.resolve(dir,file);
		fs.readFile(filepath, function (err, data) {
			 if (err) {
			     console.error('could not find file ' + filepath)
			     res.status(404).send('Error');
			     return;
			 }
			 fileResponse(req,res,data);
		});
	}
	
	app.get('/mp3/:storyId', function(req, res){
		var storyId = req.params.storyId;
		Story.findById(storyId, function (err, story) {
			if (err) {
				return res.json({code: 'error'}, 400);
			}
			if(!story.free && !req.user){
				return res.json({code :''}, 401);
			}
			loadFile(storyId, req, res);
			
		})
		
		
		
	
		
		//res.json('request for file ' + file);
	 });
	
	
  
  
  
  
  
  
  
};
