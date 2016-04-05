//The build will inline common dependencies into this file.

requirejs.config({

  paths: {
    'jquery':                   '../bower_components/jquery/dist/jquery',
    'can':						'../bower_components/canjs/amd/can',
    'framework7' : 				"../bower_components/framework7/dist/js/framework7",
    'text':						'../bower_components/text/text',
    
    //'canjs-commons':			'../bower_components/canjs-commons/canjs-commons',
    'canjs-commons':			'resources/canjs-commons',
    
    'mtemplate':				'resources/canjs-commons/mustachetemplate',
    'basecontroller':			'resources/canjs-commons/basecontroller',
    //'canjsfm7-plugin':			'../bower_components/canjs-commons/canjs-commons/canjsfm7-plugin',
    'canjsfm7-plugin':	'resources/canjs-commons/canjsfm7-plugin',
    
    'jplayer':					'resources/jquery.jplayer.2.7.0',
    'sugar':					'../bower_components/sugar/release/sugar-full.development'
    
    },
  shim: {
   
      'can': ['jquery'],
      'mtemplate' : ['jquery', 'can']
  }
});
define([
    
    'app/appcontrol'], function(){
	
});
