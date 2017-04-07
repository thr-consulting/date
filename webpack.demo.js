var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname);

module.exports = {
	entry: './demo/index.js',
	target: 'web',
	output: {
		path: path.resolve(root, 'demo'),
		filename: "demo.js",
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
		]
	},
};
