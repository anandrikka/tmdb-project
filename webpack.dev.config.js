var webpack = require('webpack');
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
            'react-bootstrap',
            'redux-thunk',
            'redux-logger',
            'react-modal',
            'react-player',
            'react-slick'
        ]
    },
    output: {
        path: '/dist',
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },
    devServer: {
        inline: true,
        port: 8080,
        proxy: {
            '/api/*': 'http://localhost:80'
        }
    },
    devtool: 'inline-source-map',
    eslint: {
        configFile: './.eslintrc'
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('react_assets', 'react-assets.bundle.js'),
        // new CleanWebpackPlugin(['dist'], {
        //     root: __dirname + '/',
        //     verbose: true,
        //     dry: false,
        //     exclude: ['assets']
        // }),
        // new HtmlWebpackPlugin({
        //     filename: '../index.html',
        //     template: 'template.html'
        // }),
        new ExtractTextPlugin("./assets/css/main.css")
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
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
				test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
			{
				test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/,
				loader: 'url-loader?limit=5000'
			}
        ]
    }
}