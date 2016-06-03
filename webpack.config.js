var webpack = require('webpack')
var path = require('path')

/**
 * 开发环境开react热替换
 */
var entry;
var NODE_ENV = 'development';
entry = [
    'eventsource-polyfill', // necessary for hot reloading with IE,没再IE试过，也基本不会在IE调试
    'webpack-hot-middleware/client',
    './src/index.jsx'
]
module.exports = {
	devtool: 'inline-source-map',
	entry: {
		app : entry,
        //vendor: vendor,
		//libs : ['react','antd'], 
	}, 
    output: {
        filename: 'bundle.js',
		path: path.resolve(__dirname,'public/js'),
		publicPath: '/js/',
		chunkFilename: '[name]-[id]-[chunkHash].chunk.js'
    },
	module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
			{ 
            	test: /\.js[x]?$/, 
            	loader: 'babel',
				exclude: /node_modules/,//解析node_modules的es6语法 
            },
			{test: /\.(jpg|png|gif)$/, loader: "url?limit=8192"},
        ]
    },
	resolve: {
		alias: {
			'r2': path.resolve(__dirname,'src/libs/r2'),
			'.fr': path.resolve(__dirname,'.fr'),
			'frontend': path.resolve(__dirname,'.fr/generator/frontend'),
			'src': path.resolve(__dirname,'src'),
			'css': path.resolve(__dirname,'style/css'),
			'img': path.resolve(__dirname,'style/img'),
			'page': path.resolve(__dirname,'src/page'),
			'libs': path.resolve(__dirname,'src/libs'),
			'validate': path.resolve(__dirname,'src/libs/antd-form-validate'),
			'common': path.resolve(__dirname,'src/common'),
		}, 
		extensions: ['', '.js', '.jsx']
	},
	externals : [
		{
		}
	],
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		//new webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js",['app']),
		//new webpack.optimize.CommonsChunkPlugin("libs","libs.bundle.js",['vendor','chunk']),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)  //定义开发和生产环境
		}),
    ]
};
