
define([
        
        'canjs-commons/functions',
     	 'can/view/mustache', 
     	 'canjs-commons/extensions',
         'can/util/library', 
         'can/control/route', 
         'can/model',      
         'can/component',
         'can/control',
         'can/route',
         'can/map/delegate',
         'can/construct/super',
         'can/construct/proxy',
         'can/control/plugin',
         'can/list',
         'can/map/backup',
         'can/map/define',
         'can/map/validations'
     
          
         
         
         ], function(Functions) {
	
	C = Functions;
	can.extend(C, {
		formatDate : function(date){
			 if(date==null){
				 console.error('could not format ' + date);
				 return null;
			 }
			 if(typeof date === "string"){
					return date;
				}

		
			 var s = date.format('{yyyy}-{MM}-{dd}');
			 return s;
		},
		compute : function(c){
			if(can.isFunction(c)){
				return c();
			}else{
				return c;
			}
		},
		parseDate : function(inputString){
			
			  var parts = inputString.split('-');
			  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
			  var result = new Date(parts[0], parts[1]-1, parts[2], 12,0,0,0); // Note: months are 0-based
			  console.log('parseDate ' + result);
			  return result;
		}
	})
	
});