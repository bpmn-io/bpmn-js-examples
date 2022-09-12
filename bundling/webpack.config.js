var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundled.js'
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        type: 'asset/source'
      }
    ]
  }
};