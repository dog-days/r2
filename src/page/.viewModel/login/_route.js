'use strict';
var view = function(){
	//这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过异常
	var re; 
	try{
		re = `${r2Common.prefixUrl}/login`;
	}catch(e){}
	return re;
} 
module.exports = {
	layout: "main",
	path: view(), 
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"login")
    },
}
