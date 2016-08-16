'use strict';
//require('babel-core/register');

var commander = require('commander')
var createRoute = require("./createRouteFile.js")
var createReducer = require("./createReducerFile.js")


commander
  .version('0.0.1')
  .option('-m, --viewModel', 'render src/page/.viewModel')
  .parse(process.argv);
var viewPath;
if(process.env.NODE_ENV == "production"){
	viewPath = [
		"src/page/view", 
	];
}else if(!commander.viewModel){
	viewPath = [
		"src/page/view", 
	];
}else if(commander.viewModel){
	viewPath = [
		"src/page", 
	];
}

new createRoute({
	path: viewPath,
	tplPath: ".end/script/route_tpl",
	fileName:"_route.js",
	savePath:".end/temp/routes.js",
});

new createReducer({
	path: viewPath,
	tplPath: ".end/script/reducer_tpl",
	fileName:"reducer.js",
	savePath:".end/temp/reducers.js",
});
