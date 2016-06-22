'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      sources: 'app',
      dist: 'dist'
    },

    jshint: {
      src: [
        ['<%= config.sources %>']
      ],
      options: {
        jshintrc: true
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          // strip unnecessary built-ins
          builtins: [ 'events' ],
          insertGlobalVars: {
            process: function () {
                return 'undefined';
            },
            Buffer: function () {
                return 'undefined';
            }
          }
        },
        transform: [ 'brfs' ]
      },
      watch: {
        options: {
          watch: true
        },
        files: {
          '<%= config.dist %>/app.js': [ '<%= config.sources %>/**/*.js' ]
        }
      },
      app: {
        files: {
          '<%= config.dist %>/app.js': [ '<%= config.sources %>/**/*.js' ]
        }
      }
    },
    copy: {
      comments: {
        files: [ {
          src: require.resolve('bpmn-js-embedded-comments/assets/comments.css'),
          dest: '<%= config.dist %>/comments.css'
        } ]
      },
      diagram_js: {
        files: [ {
          src: require.resolve('diagram-js/assets/diagram-js.css'),
          dest: '<%= config.dist %>/diagram-js.css'
        } ]
      },
      app: {
        files: [
          {
            expand: true,
            cwd: '<%= config.sources %>/',
            src: ['**/*', '!**/*.js'],
            dest: '<%= config.dist %>'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },

      samples: {
        files: [ '<%= config.sources %>/**/*.*' ],
        tasks: [ 'copy:app' ]
      },
    },

    connect: {
      livereload: {
        options: {
          port: 9013,
          livereload: true,
          hostname: 'localhost',
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    }
  });

  // tasks

  grunt.registerTask('build', [ 'browserify:app', 'copy' ]);

  grunt.registerTask('auto-build', [
    'copy',
    'browserify:watch',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', [ 'jshint', 'build' ]);
};
