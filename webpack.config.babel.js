import path from 'path';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const root = path.resolve(__dirname);

module.exports = {
	entry: './lib/index.js',
	target: 'node',
	devtool: 'source-map',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(root, 'dist'),
		filename: 'index.js',
		library: 'date',
		libraryTarget: 'umd',
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
							babelrc: false,
							presets: [
								['es2015', {loose: true, modules: false}],
								'stage-1',
								'react',
								'flow',
							],
							plugins: [
								'flow-react-proptypes',
							],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader'],
				}),
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
				use: [{loader: 'url-loader', query: {limit: 10000}}],
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'index.css',
			disable: false,
			allChunks: true,
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// 	sourceMap: true,
		// }),
	],
};
