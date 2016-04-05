
var pkg = require('../../package.json'),
	UAParser = require('ua-parser-js');
/**
 * Expose
 */

var oldversionhtml = 
			'<!DOCTYPE html>\n'+
			'<html>\n'+
			  '<head>\n'+
			    '<meta charset="utf-8">\n'+
			    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">\n'+
			    '<meta name="apple-mobile-web-app-capable" content="yes">\n'+
				'<title>Agiloo</title>\n'+
			    '<link href="css/main.css" media="all" rel="stylesheet" type="text/css" />\n'+
			    '<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet" type="text/css">\n'+			    
			    '<link rel="stylesheet" type="text/css" href="css/icons/icomoon/style.css">\n'+
			    '</head>\n'+
			  '<body class="" pagebase="fullscale">\n'+
				'<div class="versionmessage">The browser version is not supported</div>\n'+	
				
			  '</body>\n'+
			'</html>\n'; 


function render(data){
	var html = 
		'<!DOCTYPE html>\n'+
		(data.windowlogger? '<html windowlogger="true">\n' : '<html>\n' )+
		  '<head>\n'+
		    '<meta charset="utf-8">\n'+
		    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">\n'+
		    '<meta name="apple-mobile-web-app-capable" content="yes">\n'+
			'<title>Agiloo</title>\n'+
		    '<link href="css/main.css?v='+data.version+'" media="all" rel="stylesheet" type="text/css" />\n'+
		    '<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet" type="text/css">\n'+			    
		    '<link rel="stylesheet" type="text/css" href="css/icons/icomoon/style.css">\n'+
		    '</head>\n'+
		  '<body class="" pagebase="fullscale">\n'+
			'<script data-main="dist/app" src="require.js"></script>\n'+
			'<script src="framework7.min.js?v='+data.version+'"></script>\n'+
			'<script type="text/javascript">\n'+
				'require.config({\n'+
					'baseUrl : "dist",\n'+
					'urlArgs : "v='+data.version+'"\n'+
				'})\n'+
				'appconfig = {\n'+
					'fixture:false\n'+
				'}\n'+
			'</script>\n'+
		  '</body>\n'+
		'</html>\n';
	return html;
}



module.exports = function (app, passport) {
  
	
	app.get('/', function(req, res, next){
		var FORCE_SSL = process.env.FORCE_SSL || false;
	    if (req.headers['x-forwarded-proto'] !== 'https' && FORCE_SSL) {
	        return res.redirect(['https://', req.get('Host'), req.url].join(''));
	    }

		var parser = new UAParser();
  		var ua = req.headers['user-agent'], browserName, browserVersionNumber;
  		
  		try{
  			browserName = parser.setUA(ua).getBrowser().name;
  	  		var fullBrowserVersion = parser.setUA(ua).getBrowser().version;
  	  		 	  		
  	  		var browserVersion = fullBrowserVersion.split(".",1).toString();
  	  		browserVersionNumber = Number(browserVersion);

  		}catch(error){
  			console.error('could not detect browser version');
  		}
  		
  		if (browserName == 'IE' && browserVersionNumber <= 10){
  			return res.send(oldversionhtml);
  		}


  		data = {
  			version : pkg.version || 1
  		}
  		
		
		
		
		if(req.url.indexOf('windowlogger')>-1){
			data.windowlogger = true;
		}
		
		//var starthtml = render(data);
		
		return res.render('views/home', {
                
            });
		
		//return res.send(starthtml);
	});
	
};