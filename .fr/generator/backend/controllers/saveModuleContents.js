'use strict';
var path = require('path')
var parse = require('co-body');
var fs = require('fs');

/**
 * Module dependencies.
 */
module.exports = function* saveModuleContents(next) {
	var post = yield parse(this, { limit: '9kb' });
	post = JSON.parse(post);
	var msg = {data:[] }
	if(!fs.existsSync(path.resolve(post.moduleDir))){
		fs.mkdirSync(path.resolve(post.moduleDir));
	}
	if(!fs.existsSync(path.resolve(post.moduleDir,"components"))){
		fs.mkdirSync(path.resolve(post.moduleDir,"components"));
	}
	if(!fs.existsSync(path.resolve(post.moduleDir,"dataSet"))){
		fs.mkdirSync(path.resolve(post.moduleDir,"dataSet"));
	}
	if(!fs.existsSync(path.resolve(post.moduleDir,"children")) && post.parent){
		fs.mkdirSync(path.resolve(post.moduleDir,"children"));
	}
	for(var k in post.data){
		var obj = post.data[k];
		try{
			fs.writeFileSync(obj.path,obj.content)
			msg.data.push({
				status:0,
				msg: obj.id + "成功写入！"
			})
		}catch(e){
			msg.data.push({
				status:-1,
				msg: obj.id + "写入出错!"
			})
			msg = {
			}
		}
	}
	this.body = msg;
	this.status = 200;
	yield require('../script/generator/action/CreateRouterAndReducer.js');
};
