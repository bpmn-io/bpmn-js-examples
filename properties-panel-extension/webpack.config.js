const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.bpmn$/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/index.html', to: '.' }
      ]
    })
  ]
};