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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: 'file-loader',
      },
    ]
  },
  mode: 'development',
  devtool: 'source-map'
};
