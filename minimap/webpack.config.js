const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: ['./public/app.js']
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.bundled.js'
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: '../node_modules/bpmn-js/dist/assets/**', to: 'pubblic/vendor/bpmn-js/assets' },
      { from: '../node_modules/diagram-js-minimap/assets/**', to: 'public/vendor/diagram-js-minimap/assets' }
    ])
  ],
  mode: 'development',
  devtool: 'source-map'
};
