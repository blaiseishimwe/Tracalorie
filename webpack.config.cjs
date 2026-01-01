const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true, // Enable gzip compression
    port: 3000, // Run on port 9000
    open: true, // Open the browser automatically
    hot: true, // Enable Hot Module Replacement
    historyApiFallback: true, // For SPAs using the HTML5 History API.
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, , 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/, // Or /\.(js|mjs|cjs)$/
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // @babel/preset-env: Transforms modern JavaScript (ES6+) to older versions, handling polyfills and syntax based on your target browsers.
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
