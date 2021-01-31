const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  	mode: 'development',
  	devtool: 'inline-source-map',
  	devServer: {
		contentBase: path.resolve(__dirname, './public'),
		port: 8080,
		// hot: true,
		open: true,
  	},

  	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					{loader: 'css-loader', options: {sourceMap: true}},
					{loader: 'postcss-loader', options: {sourceMap: true}},
					{loader: 'sass-loader', options: {sourceMap: true}}
				]
			}
		]
	},
});