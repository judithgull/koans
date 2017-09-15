const path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './app/app-module.ts',
    module: {
      loaders:[
        // {
        //   test: /\.ts$/,
        //   include: [
        //     path.resolve(__dirname, "app"),
        //   ],
        //   enforce: 'pre',
        //   exclude: /node_modules/,
        //   loader: 'tslint-loader'
        // },
        {
          test: /\.ts$/,
          include: [
            path.resolve(__dirname, "app"),
          ],
          exclude: /node_modules/,
          loader: 'ts-loader'
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
    watch:true,
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3001,
        proxy: 'http://localhost:3000/'
    })
    ],
    resolve: {
      extensions: [ ".ts", ".js", ".scss",".jade"]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build/app/js')
    }
  };