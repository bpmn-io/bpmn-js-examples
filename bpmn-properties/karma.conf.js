// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require('puppeteer').executablePath();

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'Safari' ]
const browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

module.exports = function(karma) {
  karma.set({

    frameworks: [
      'webpack',
      'mocha'
    ],

    files: [
      'test/spec/**/*Spec.js'
    ],

    reporters: [ 'dots' ],

    preprocessors: {
      'test/spec/**/*Spec.js': [ 'webpack' ]
    },

    browsers,

    singleRun: true,
    autoWatch: false,

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.css|\.bpmn$/,
            type: 'asset/source'
          }
        ]
      },
      devtool: 'eval-source-map'
    }
  });
};
