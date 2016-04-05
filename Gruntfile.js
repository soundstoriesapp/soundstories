/*global module:false*/
'use strict';

var opt = require('./grunt-requirejs-build');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    clean: {
      release: 'public/dist'
    },

    requirejs: {
      compile: {
        options: opt
      }
    },
    less: {
        development: {
          options: {
            compress: true,
            yuicompress: true,
            optimization: 2
          },
          files: {
            "public/css/main.css": "public/app-source/css/main.less"
          }
        }
      },
      watch: {
        styles: {
          files: ['public/app-source/css/**/*.less'], // which files to watch
          tasks: ['less'],
          options: {
            nospawn: true
          }
        }
      },
      connect: {
        server: {
          options: {
            port: 5001,
            base: 'public/'
          }
        }
      },
      shell: {
          options: {
              stderr: false
          },
          foreman : {
        	  command : 'foreman start web'
          },
          foremanDebug : {
            command : 'foreman run node --debug index.js'
          }
      }
  });

  // Load tasks from NPM
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');

  // Default task.
  grunt.registerTask('build', ['clean', 'requirejs', 'less']);
  grunt.registerTask('default', ['less','watch']);
  grunt.registerTask('server', ['less', 'connect', 'watch']);
  grunt.registerTask('d', ['less',  'shell:foreman']);
  grunt.registerTask('css', ['less',  'watch']);
  
};
