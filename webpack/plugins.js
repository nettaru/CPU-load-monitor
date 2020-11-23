/*
 *  Webpack Plugins
 *  ===============
 *
 *  Which plugins are used by Webpack to compile the application bundle.
 */

const HTML = require('html-webpack-plugin');

module.exports = (env = 'development') =>
  [
    //  HTML Plugin
    //  -----------
    //
    //  Simplifies creation of HTML files to serve Webpack bundles.
    //
    //  Reference:
    //  - <https://webpack.js.org/plugins/html-webpack-plugin/>
    new HTML({
      title: 'Load Monitoring Web App',
      description: 'An awesome code challenge project',
      template: 'index.html',
      filename: './index.html'
    })
  ].filter(Boolean);
