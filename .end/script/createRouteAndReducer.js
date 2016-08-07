'use strict';
require('babel-core/register');
// require('./app')

var createRoute = require("./createRouteFile.js")
var createReducer = require("./createReducerFile.js")

new createRoute({
	path: [
		"src", 
		".fr/generator/frontend", 
	],
	tplPath: ".end/script/route_tpl",
	fileName:"_route.js",
	savePath:".fr/.temp/routes.js",
});

new createReducer({
	path: [
		"src", 
		".fr/generator/frontend", 
	],
	tplPath: ".end/script/tpl",
	fileName:"reducer.js",
	savePath:".fr/.temp/reducers.js",
});
