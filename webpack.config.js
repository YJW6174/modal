var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        'dev': ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                ptest: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        historyApiFallback: false,
        noInfo: true,
        hot: true,
        publicPath: '/',
        stats:{
            colors: true
        },
        disableHostCheck: true
    },
    devtool: '#source-map'
}
