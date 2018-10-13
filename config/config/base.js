'use strict';

const paths = require('../paths');

module.exports = {
  output: {
    path: paths.DIST,
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devtool: 'source-map'
};
