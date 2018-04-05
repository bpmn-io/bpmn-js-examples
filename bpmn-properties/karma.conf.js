module.exports = function(karma) {
  karma.set({

    frameworks: [
      'browserify',
      'mocha',
      'chai'
    ],

    files: [
      'test/spec/**/*Spec.js'
    ],

    reporters: [ 'dots' ],

    preprocessors: {
      'test/spec/**/*Spec.js': [ 'browserify' ]
    },

    browsers: [ 'Chrome' ],

    browserNoActivityTimeout: 30000,

    singleRun: true,
    autoWatch: false,

    // browserify configuration
    browserify: {
      debug: true,
      transform: [
        [ 'stringify', {
          global: true,
          extensions: [
            '.bpmn',
            '.xml',
            '.css'
          ]
        } ],
        [ 'babelify', {
          global: true
        } ],
      ]
    }
  });
};
