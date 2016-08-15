'use strict';
var fs = require("fs")
var path = require("path")

/**
 * @param {Array} filesPath 指定文件的路径
 * @param {String} dirPath 指定文件的设置目录
 * @this {Array} reducersName reducer名数组
 * @this {Array} reducers reducer信息数组 
 */
class Script {
	constructor(filesPath,dirPath){
		this.filesPath = filesPath;
		this.dirPath = dirPath;
		this.routesName = [];
		this.routes = [];
		this.run();
	}	

    run(){
    	this.filesPath.forEach(v=>{
    		var sp = v.split("/")
    		var r = sp[sp.length-2]
			var index = this.routesName.indexOf(r);
			if(index != -1){
				console.error("重复的view名",r,v,this.reducers[index].absolutePath)
				this.error = true;
			}
			this.routesName.push(r);
			var pre_path = this.dirPath[0];
			var r_path = v.split(this.dirPath[0]);
			if(!r_path[1]){
				r_path = v.split(this.dirPath[1]);
				pre_path = this.dirPath[1];
			}
			this.routes.push({
				name: r,
				path: pre_path + r_path[1],
				absolutePath: v,
			})
    	})
    	// console.log(this.routes)
	}
}

module.exports = Script;





