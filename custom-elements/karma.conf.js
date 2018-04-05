/* global process */

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE', 'PhantomJS' ]
var browsers =
  (process.env.TEST_BROWSERS || 'PhantomJS')
    .replace(/^\s+|\s+$/, '')
    .split(/\s*,\s*/g)
    .map(function(browser) {
      if (browser === 'ChromeHeadless') {
        process.env.CHROME_BIN = require('puppeteer').executablePath();

        // workaround https://github.com/GoogleChrome/puppeteer/issues/290
        if (process.platform === 'linux') {
          return 'ChromeHeadless_Linux';
        }
      } else {
        return browser;
      }
    });


module.exports = function(karma) {
  karma.set({

    frameworks: [ 'browserify', 'mocha', 'chai' ],

    files: [
      'test/spec/**/*Spec.js'
    ],

    reporters: [ 'spec' ],

    preprocessors: {
      'test/spec/**/*Spec.js': [ 'browserify' ]
    },

    browsers: browsers,

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
            '.css'
          ]
        } ],
        [ 'babelify', {
          global: true
        } ]
      ]
    }
  });
};
