var webpack = require('webpack')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack_config = require('./webpack.config.js');
//var vendor = require('./src/vendor.js');
var config = Object.assign({}, webpack_config, {
    devtool: '',
    entry: {
        app: './src/index.jsx',
        //vendor: vendor,
		//libs : ['react','antd'], 
    },
    resolve: Object.assign(webpack_config.resolve, {
    }),
	module: {
        loaders: [
			{test: /\.(jpg|png)$/, loader: "url?limit=8192"},
			{ 
            	test: /\.js[x]?$/, 
            	loader: 'babel',
				exclude: /node_modules/,//设置node_modules目录为根目录下的node_modules,根目录以package为参考
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
		//new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", ['app']),
		//new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", []),
		//new webpack.optimize.CommonsChunkPlugin("libs", "libs.bundle.js", ['vendor', 'chunk']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production") //定义为生产环境
        }),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('css/styles.css'),
    ]
});
//console.log(config.entry);
module.exports = function(grunt) {
    grunt.initConfig({
        webpack: {
            production: config
        },
        compress: {
            main: {
                options: {
                    mode: 'zip',
					archive: function(){
						return 'publish-' + grunt.template.today('yyyymmddHHMMss') + '.zip';
					}
                },
                expand: true,
                cwd: 'public/',
                src: ['**/*'],
            }
        }
        
    });
    //grunt.loadNpmTasks('grunt-contrib-compass');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-string-replace');	
    //grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //grunt.loadNpmTasks('grunt-contrib-clean');	
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask("default", ['webpack','compress']);
}
