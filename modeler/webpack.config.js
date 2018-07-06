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
  mode: 'development',
  devtool: 'source-map'
};
