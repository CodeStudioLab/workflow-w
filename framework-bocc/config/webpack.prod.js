const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  	mode: 'production',
  	// devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
	
});


