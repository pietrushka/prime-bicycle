const path = require('path')
const {merge} = require('webpack-merge');
const common = require('./webpack.config.common')
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin')

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, 'dist'),
        src: 'index.html',
        dest: 'index.html',
        inline: true,
        minify: true,
        extract: true,
        width: 375,
        height: 565,
        penthouse: {
          blockJSRequests: false,
        }
      })
    ]
  }
});