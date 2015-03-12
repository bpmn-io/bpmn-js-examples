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
            standalone: 'BpmnJS',
            // make sure we do not include browser shims unnecessarily
            builtins: false,
            insertGlobalVars: {
              process: function () {
                  return 'undefined';
              },
              Buffer: function () {
                  return 'undefined';
              }
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [ 'browserify:bower' ]);
};