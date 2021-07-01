const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Este es nuestro archivo de entrada
  	entry: './src/js/main.js',
  	plugins: [
    	new CleanWebpackPlugin(),
    	new HtmlWebpackPlugin({
			title: 'Documentación ',
			template: './src/index.html',
			filename: 'index.html',
			minify: false
		}),
		new MiniCssExtractPlugin({
			filename: './css/[name].css',
		}),
	
  	],
  
	module: {
		rules: [
			{
					test:/\.js$/,
					exclude: /node_modules/,
					use: { loader:"babel-loader"}
			},
			{
					test: /\.(png|jpe?g|gif|svg)$/i,
					loader: 'file-loader',
					options: {
							name: '[name].[ext]',
							outputPath: './img',
							publicPath: 'img',
							emitFile: true,
							esModule: false,
					}
			},
			{
				test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
				{
					loader: 'file-loader',
					options: {
					name: '[name].[ext]',
					outputPath: 'fonts/'
					}
				}
				]
			},
		],
	},

  /*En esta salida  deja el archivo
  * main.builder.js,  en la carpeta JS
  * en el directorio ./public
  */
  output: {
	  filename: 'js/[name].js',
	  path: path.resolve(__dirname, '../public'),
  },
};