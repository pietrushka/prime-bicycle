const path = require('path')
const glob = require('glob')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PurgecssPlugin = require('purgecss-webpack-plugin')

const generateHTMLPlugins = () => glob.sync('./src/**/*.html').map(
  dir => new HTMLWebpackPlugin({
    filename: path.basename(dir), // Output
    template: dir, // Input
  }),
)

module.exports = {
  entry: [ "./src/scss/index.scss" ],

  output: {
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    ...generateHTMLPlugins(),

    new MiniCssExtractPlugin(),  
    new PurgecssPlugin({
      paths: glob.sync(`dist/**/*`,  { nodir: true }),
    })
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader',
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
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
        },
      },   
         
      {
        test: /\.(png|jpg|webp)$/,
        loader: 'url-loader'
      },

    ],
  },
}