'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

var ProgressPlugin = require('webpack/lib/ProgressPlugin');

const baseConfig = require('./webpack.base.config');

const config = merge.smart(baseConfig, {
  mode: 'development',
  target: 'electron-main',
  entry: {
    main: './src/main/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, '..', 'src', 'main', 'index.ts')],
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});

const compiler = webpack(config);

compiler.apply(
  new ProgressPlugin(function(percentage, msg, current, active, modulepath) {
    if (process.stdout.isTTY && percentage < 1) {
      process.stdout.cursorTo(0);
      modulepath = modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : '';
      current = current ? ' ' + current : '';
      active = active ? ' ' + active : '';
      process.stdout.write(
        (percentage * 100).toFixed(0) + '% ' + msg + current + active + modulepath + ' '
      );
      process.stdout.clearLine(1);
    } else if (percentage === 1) {
      process.stdout.write('\n');
      console.log('webpack: done.');
    }
  })
);

module.exports = compiler;
