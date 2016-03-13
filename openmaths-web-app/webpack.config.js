'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'app/main.tsx')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/}
        ]
    }
};