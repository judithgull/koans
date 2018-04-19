const path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

export const env = process.env.NODE_ENV || "development";
export const isDevelopment = env === "development";
export const isProduction = env === "production";

console.log("Webpack config: ", env);

const acePath = 'node_modules/ace-builds/src-min-noconflict/'

const plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer()
      ]
    }
  }),
  new FaviconsWebpackPlugin('./app/assets/favicon.png'),
  new HtmlWebpackPlugin({
    template: 'app/index.jade'
  }),
  new CopyWebpackPlugin([{
    from: 'lib/ace-builds/src-min-noconflict'
  }]),
  new CopyWebpackPlugin([{
    from:
      acePath + '*javascript.js',
    to: '[name].[ext]'
  }]),
  new CopyWebpackPlugin([{
    from:
      acePath + 'theme-tomorrow_night_bright.js',
    to: '[name].[ext]'
  }]),
  new CopyWebpackPlugin([{
    from:
      acePath + 'ace.js',
    to: '[name].[ext]'
  }]),
  new CopyWebpackPlugin([{
    from: 'node_modules/typescript/lib/typescriptServices.js',
    to: '[name].[ext]'
  }]),
  new CopyWebpackPlugin([{
    from: 'node_modules/chai/chai.js',
    to: '[name].[ext]'
  }])
];

if (isDevelopment) {
  plugins.push(new BrowserSyncPlugin({
    host: 'localhost',
    port: 3001,
    proxy: 'http://localhost:3000/'
  }));
} else if (isProduction) {
  // TODO
  // plugins.push(new UglifyJSPlugin());
}


const webpackConfig = {
  entry: './app/app-module.ts',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, "app"),
        ],
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, "app"),
        ],
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig-frontend.json'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/'
        }
      },
    ]
  },
  watch: isDevelopment,
  plugins: plugins,
  resolve: {
    extensions: [".ts", ".js", ".scss", ".jade", '.svg']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/app')
  }
};

if (isDevelopment) {
  webpackConfig.devtool = 'inline-source-map'
}

module.exports = webpackConfig;