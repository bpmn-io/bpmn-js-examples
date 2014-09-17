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
        ['<%=config.sources %>']
      ],
      options: {
        jshintrc: true
      }
    },

    browserify: {
      options: {
        transform: [ 'brfs' ],
        browserifyOptions: {
          builtins: [ 'fs' ],
          commondir: false
        },
        bundleOptions: {
          detectGlobals: false,
          insertGlobalVars: [],
          debug: true
        }
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
      app: {
        files: [
          {
            expand: true,
            cwd: '<%= config.sources %>/',
            src: ['**/*.*', '!**/*.js'],
            dest: '<%= config.dist %>'
          }
        ]
      }
    },
    watch: {
      samples: {
        files: [ '<%= config.sources %>/**/*.*' ],
        tasks: [ 'copy:app' ]
      },
    },
    connect: {
      options: {
        port: 9013,
        livereload: 9014,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    }
  });

  // tasks

  grunt.registerTask('build', [ 'browserify:app', 'copy:app' ]);

  grunt.registerTask('auto-build', [
    'copy',
    'browserify:watch',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', [ 'jshint', 'build' ]);
};