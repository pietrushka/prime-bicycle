const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.common')

module.exports = merge(common, {
  mode: "development",

  watch: true,

  devtool: "source-map", 

  // required if using webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchOptions: {
      hot: true,
      poll: true,
      ignored: '/node_modules/',
    }
  },
})