'use strict';
require('babel-core/register');
// require('./app')

var createRoute = require("./createRouteFile.js")
var createReducer = require("./createReducerFile.js")

new createRoute({
	path: [
		"src/page/view", 
		"src/page/.viewModel", 
	],
	tplPath: ".end/script/route_tpl",
	fileName:"_route.js",
	savePath:".end/temp/routes.js",
});

new createReducer({
	path: [
		"src/page/view", 
		"src/page/.viewModel", 
	],
	tplPath: ".end/script/reducer_tpl",
	fileName:"reducer.js",
	savePath:".end/temp/reducers.js",
});
