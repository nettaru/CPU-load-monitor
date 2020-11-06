/*
 *  `server` task
 *  =============
 *
 *  Creates a Browsersync Web server instance for live development. Makes use
 *  of some Webpack middlewares to enable live reloading features.
 */

const server = require('webpack-dev-server');
const webpack = require('../lib/webpack');

const serve = () => {
  const compiler = webpack('development');

  return new server(compiler);
};
serve.description = `Create a server instance for live development.`;

module.exports = serve;
