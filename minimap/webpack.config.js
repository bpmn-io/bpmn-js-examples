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
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
      { from: 'assets/**', to: 'vendor/diagram-js-minimap', context: 'node_modules/diagram-js-minimap/' }
    ])
  ],
  mode: 'development',
  devtool: 'source-map'
};
