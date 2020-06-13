const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/app.js'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, './dist'),
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
