module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {

      // create customized bower bundle
      bower: {
        files: {
          'dist/bpmn-viewer-custom.js': [ 'index.js' ]
        },
        options: {
          browserifyOptions: {
            builtins: false
          },
          bundleOptions: {
            standalone: 'BpmnJS',
            detectGlobals: false,
            insertGlobalVars: [],
            debug: false
          },
          transform: [
            // ensure you expose all your external libraries via their global prefix
            // (jQuery -> window.$, ...)
            [ 'exposify', {
              global: true,
              expose: {
                sax: 'sax',
                snapsvg: 'Snap',
                lodash: '_',
                jquery: '$',
                'jquery-mousewheel': '$'
              }
            } ]
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [ 'browserify:bower' ]);
};