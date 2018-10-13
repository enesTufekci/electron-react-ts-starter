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

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const spawn = require('child_process').spawn;

const startMain = require('./startMain');

const rendererDevConfig = require('./config/rendererDev');
const devServerConfig = require('./config/devServer');

const PORT = 4455;
const HOST = '0.0.0.0';

const serverConfig = {
  ...devServerConfig,
  before() {
    startMain.run((err, stats) => {
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      );

      spawn('electron', ['./dist/main.js'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    });
  }
};

const compiler = webpack(rendererDevConfig);

const devServer = new WebpackDevServer(compiler, serverConfig);

// Launch WebpackDevServer.
devServer.listen(PORT, HOST, (err, stats) => {
  if (err) {
    return console.log(err);
  }
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
