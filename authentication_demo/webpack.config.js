const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
