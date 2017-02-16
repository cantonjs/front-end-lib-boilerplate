
import { resolve } from 'path';
import webpack from 'webpack';
import { name } from './package.json';
import camelcase from 'lodash.camelcase';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const PROJECT_PATH = __dirname;
const inProject = (...args) => resolve(PROJECT_PATH, ...args);
const inSrc = inProject.bind(null, 'src');
const inTest = inProject.bind(null, 'test');
const srcDir = inSrc();
const testDir = inTest();

export default {
	output: {
		library: camelcase(name),
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [srcDir, testDir],
				loader: 'babel',
				query: {
					presets: [
						['es2015', { modules: false }],
						'stage-0',
					],
					cacheDirectory: true,
					babelrc: false,
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	resolve: {
		modules: [srcDir, 'node_modules'],
		extensions: ['.js'],
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
	},
	devtool: 'source-map',
};
