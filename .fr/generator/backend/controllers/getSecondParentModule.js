'use strict';
var path = require('path')
var parse = require('co-body');
var ReadSecondParentModuleDirName = require("../script/generator/model/ReadSecondParentModuleDirName")

/**
 * Module dependencies.
 */
module.exports = function* creator(next) {
	var parentModuleName = new ReadSecondParentModuleDirName({
		path: [
			path.resolve("src/page/view"),
			path.resolve(".fr/generator/frontend/view"),
		],	
	}) 
	var result = parentModuleName.getDirNames();
	var msg = {
		data: result,
		message: "获取二级父模块目录成功",
	}
	this.body = msg;
	this.status = 200;
};
