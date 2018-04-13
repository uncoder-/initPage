const path = require('path');
const webpack = require('webpack');
// 环境
var ENV = process.env.NODE_ENV || 'development';
// 模版
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 合并
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 拷贝
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 监控
const DashboardPlugin = require('webpack-dashboard/plugin');
// 文件路径
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');

const config = {
	mode: 'development',
	// 源码调试'source-map'
	devtool: ENV === 'development' ? 'source-map' : false,
	optimization: {
		// sideEffects: false,
		// minimize: false,
		// splitChunks: {
		// 	minSize: 30000
		// },
		// runtimeChunk: true
	},
	// 将库的对象挂靠在全局对象中，
	// 通过另外一个对象存储对象名以及映射到对应模块名的变量，
	// 直接在html模版里使用库的CDN文件
	// 从输出的 bundle 中排除依赖
	externals: {
		jquery: 'window.jQuery',
		react: 'React',
		'react-dom': 'ReactDOM',
		// 		'echarts': 'window.echarts',
		//     	'react-router': 'ReactRouter',
		//     	'redux': 'Redux',
		//     	'react-redux': 'ReactRedux',
		//     	'react-router-redux':'ReactRouterRedux'
	},
	// 指定根目录
	context: ROOT_PATH,
	// 入口
	entry: {
		example: './src/page/example/app',
		index: './src/page/index/app'
	},
	// 出口
	output: {
		filename: '[name].[hash:5].js',
		// 指定非入口块文件输出的名字，动态加载的模块
		chunkFilename: '[name].bundle.js',
		path: BUILD_PATH,
		publicPath: ''
	},
	resolve: {
		// 解析模块时应该搜索的目录
		modules: [APP_PATH, 'node_modules'],
		// 自动解析确定的扩展
		extensions: ['.js', '.jsx'],
		// 优先引入的文件名
		mainFiles: ['index'],
		// 模块别名列表
		alias: {
			assets: path.join(APP_PATH, 'assets'),
			common: path.join(APP_PATH, 'common')
		}
	},
	// 模块
	module: {
		rules: [
			{
				test: /\.(js|jsx)(\?.+)?$/,
				use: [
					{
						loader: 'babel-loader',
						options: { cacheDirectory: true }
					}
				],
				include: [APP_PATH],
				exclude: [NODE_MODULES_PATH]
			},
			{
				test: /\.(css|less)(\?.+)?$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader']
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000
					}
				}
			}
		]
	},
	// server
	devServer: {
		port: 9000,
		contentBase: BUILD_PATH,
		publicPath: '/',
		proxy: {
			'/api/*': {
				changeOrigin: true,
				target: 'http://www.xxxx.com',
				secure: false
			}
		},
		overlay: {
			warnings: true,
			errors: true,
			secure: false
		}
	},
	// 插件
	plugins: [
		// 从js文件中分离css出来
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			title: '举个栗子',
			filename: './example.html',
			template: './src/assets/template/example.html',
			chunks: ['example']
		}),
		new HtmlWebpackPlugin({
			title: '首页',
			filename: './index.html',
			template: './src/assets/template/index.html',
			chunks: ['index']
		}),
		// 减少闭包函数数量从而加快js执行速度
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};

if (ENV !== 'production') {
	// 监控
	// config.plugins.push(
	// 	new DashboardPlugin({
	// 		minified: false,
	// 		gzip: false
	// 	})
	// );
} else {
	// 复制
	config.plugins.push(new CopyWebpackPlugin([{ from: './data.json', to: 'data.json' }]));
	config.recordsOutputPath = path.join(__dirname, 'dist', 'records.json');
}
module.exports = config;
