  
const { merge } = require('webpack-merge')
const common = require('./webpack.config.common')

module.exports = merge(common, {
  mode: "development",

  watch: true,

  devtool: "source-map", 

  // required if using webpack-dev-server
  devServer: {
    contentBase: "./dist"
  },
})