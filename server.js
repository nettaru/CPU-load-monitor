const path = require('path');
const os = require('os');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);
const express = require('express');

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');
const expressWs = require('express-ws')(app);
 
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }
));

app.get('/', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.ws('/chat', ws => {
  const CPULoadTask = () => {
    const cpus = os.cpus().length;
    const loadAverage = os.loadavg()[0] / cpus;
    ws.send(loadAverage);
  };

  ws.on('close', () => {
    // Stop running the uptime task once the socket is closed
    clearInterval(checkCPUInterval);
  });

  const checkCPUInterval = setInterval(CPULoadTask, 10000);
  CPULoadTask();
});

// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n');
});
