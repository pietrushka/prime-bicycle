const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry:{
    index: [
      // "./src/main.js",
      "./src/scss/index.scss",
    ]
  },
  output:{
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js'
  },


  plugins: [
    new MiniCssExtractPlugin(),  
  ],

  module: {
    rules: [
      {
        test: /\.(png|jpg|webp)$/,
        loader: 'url-loader'
      },

      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     // without additional settings, this will reference .babelrc
      //     loader: "babel-loader",
      //   },
      // },

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
}