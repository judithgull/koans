const path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var yargs = require("yargs");

var isProd = yargs.argv.stage === "prod";

var plugins = [];
if(!isProd){
plugins.push(new BrowserSyncPlugin({
  host: 'localhost',
  port: 3001,
  proxy: 'http://localhost:3000/'
}));
}

module.exports = {
    entry: './app/app-module.ts',
    module: {
      loaders:[
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
        { test: /\.jade$/, 
          exclude: /node_modules/,
          loader: 'raw-loader!pug-html-loader' 
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: 'style-loader!css-loader!sass-loader'
        }
      ]
    },
    watch: false,
    plugins: plugins,
    resolve: {
      extensions: [ ".ts", ".js", ".scss",".jade"]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build/app/js')
    }

  };