const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const basePath = '.';

const absoluteBasePath = path.resolve(path.join(__dirname, basePath));

module.exports = {
  mode: 'development',
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [ '@babel/plugin-transform-react-jsx', {
                'importSource': '@bpmn-io/properties-panel/preact',
                'runtime': 'automatic'
              } ]
            ]
          }
        }
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.bpmn$/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  resolve: {
    mainFields: [
      'browser',
      'module',
      'main'
    ],
    alias: {
      'react': '@bpmn-io/properties-panel/preact/compat'
    },
    modules: [
      'node_modules',
      absoluteBasePath
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'app/index.html', to: '.' },
        { from: 'node_modules/bpmn-js/dist/assets', to: 'vendor/bpmn-js/assets' },
        { from: 'node_modules/bpmn-js-properties-panel/dist/assets', to: 'vendor/bpmn-js-properties-panel/assets' },
      ]
    })
  ]
};