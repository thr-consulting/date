var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname);

module.exports = {
	entry: './src/index.js',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(root, 'lib'),
		filename: "index.js",
		library: "date",
		libraryTarget: "umd"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['es2015', {loose: true, modules: false}],
								'stage-1',
								'react'
							]
						}
					}
				],
			},
			// {
			// 	test: /\.css$/,
			// 	use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
			// 	include: path.resolve(root, 'src'),
			// },
			// {
			// 	test: /\.less$/,
			// 	use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'less-loader'}],
			// }
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// }),
	]
};
