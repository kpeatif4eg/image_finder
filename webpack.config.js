const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'site'),
		filename: 'bundle.js'
	},
	mode: NODE_ENV,
	devtool: isDev && 'eval-source-map',
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'eslint-loader'
				}
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [ 
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: isDev ? (
								'[local]__[hash:base64:5]'
							) : (
								'[hash:base64:12]'
							)
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[hash].[ext]'
						}
					}
				]
			},
			{
				test: /\.(svg)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					'svg-react-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
	      	filename: 'style.css'
    	}),
		new copyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src', 'static'),
				to: path.resolve(__dirname, 'site'),
			}
		]),
		new webpack.DefinePlugin({
			'__DEV__': JSON.stringify(isDev),
		}),
	]
};