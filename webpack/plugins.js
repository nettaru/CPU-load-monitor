/*
 *  Webpack Plugins
 *  ===============
 *
 *  Which plugins are used by Webpack to compile the application bundle.
 */

const HTML = require('html-webpack-plugin');
const {dirs} = require('./paths');

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
      title: 'InfoCat',
      description: 'Load Monitoring Web App',
      template: 'index.html',
      filename: './index.html',
      favicon: `${dirs.static}/favicon.png`
    })
  ].filter(Boolean);
