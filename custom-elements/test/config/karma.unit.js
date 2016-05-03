'use strict';

module.exports = function(karma) {
  karma.set({

    basePath: '../../',

    frameworks: [ 'browserify', 'mocha', 'chai' ],

    files: [
      'test/spec/**/*Spec.js'
    ],

    reporters: [ 'spec' ],

    preprocessors: {
      'test/spec/**/*Spec.js': [ 'browserify' ]
    },

    browsers: [ 'PhantomJS' ],

    browserNoActivityTimeout: 30000,

    singleRun: false,
    autoWatch: true,

    // browserify configuration
    browserify: {
      debug: true,
      transform: [ [ 'stringify', { global: true, extensions: [ '.bpmn', '.xml', '.css' ] } ] ]
    }
  });
};
