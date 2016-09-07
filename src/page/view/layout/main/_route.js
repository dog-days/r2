'use strict';
var view = function(){
	//这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过r2Common未定义异常
	var re; 
	try{
		re = `${r2Common.prefixUrl}`;
	}catch(e){}
	return re;
}
var childRoutes = function(){
	var re;
	try{
		re = require('./.child_routes.js');
	}catch(e){}	
	return re;
}
var indexRoute = function(){
	var re;
	try{
		re = require("src/page/view/index/_route.js");
	}catch(e){}	
	return re;
}
module.exports = {
	path: view(), 
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"main")
    },
   	indexRoute: indexRoute(),
    childRoutes: childRoutes(),
}
