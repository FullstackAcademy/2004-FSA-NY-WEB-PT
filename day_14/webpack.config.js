const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      }
    ]
  }
}
