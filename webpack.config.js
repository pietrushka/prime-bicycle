const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

const mode = process.env.NODE_ENV || "development"

module.exports = {
  entry:{
    index: [
      "./src/index.html",
      "./src/main.js",
      "./src/styles.scss",
    ]
  },
  output:{
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js'
  },


  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin(),
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
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
        },
      },

      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      {
        //test both css and scss
        test: /\.(sc|c)ss$/i,
        use: [
          // MiniCssExtractPlugin.loader will create main.css file ind dist
          // Could replace the next line with "style-loader" here for inline css
          MiniCssExtractPlugin.loader,
          "css-loader",
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          "sass-loader",
        ],
      },
      
    ],
  },

  devtool: "source-map", 

  // required if using webpack-dev-server
  devServer: {
    contentBase: "./dist"
  },
}