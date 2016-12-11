var webpack = require('webpack');
var path = require('path');

var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/app.jsx',
        react_assets: [
            'react',
            'react-dom',
            'react-router',
            'react-redux',
            'react-bootstrap'
        ]
    },
    output: {
        path: 'dist',
        filename: '[name].[hash].bundle.js',
        publicPath: 'dist/'
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'production'" //Should be defined only in this way
            }
        }),
        new webpack.optimize.CommonsChunkPlugin("react_assets", "react-assets.[hash].bundle.js"),
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname + '/',
            verbose: true,
            dry: false,
            exclude: ['assets']
        }),
        new HtmlWebpackPlugin({
            filename: '../home.html',
            template: 'template.html'
        }),
        //new ExtractTextPlugin('main.[hash].css')
        new ExtractTextPlugin("assets/css/main.css")
    ],
    module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
            },
            {
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel'
            },
            {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=50000'
			}
		]
	}
}