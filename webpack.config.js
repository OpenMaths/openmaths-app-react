var path = require('path'),
    webpack = require('webpack'),
    WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: './src/main.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/assets/',
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules|lib/},
            {test: /\.sass$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader'},
            {test: /\.(png|gif|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'}
        ]
    },
    sassLoader: {
        indentedSyntax: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new WebpackNotifierPlugin()
    ]
};