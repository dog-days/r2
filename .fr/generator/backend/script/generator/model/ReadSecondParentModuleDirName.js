 'use strict'; 
var fs = require('fs');
var path = require('path')
var fn = require("../../../../../libs/function")

class ReadSecondParentModuleDirName {
	constructor(config){
		this.config = config;	
	}

	getDirNames(){
		let dirInfo = [];
		this.config.path.forEach((v,k)=>{
			var t = this.getDirInfo(v);
			Object.assign(dirInfo,t)
		})
		return dirInfo;
	}

	/**
	 *	获取文件夹信息
	 *@param [string] path 文件夹路径
	 *@return [object] 返回文件信息
	 */
	getDirInfo(c_path){
		var _this = this;
		return fn.eachDir(c_path).filter(function(v,k){
			if(v){
				if(v.isDirectory && fs.existsSync(path.resolve(v.path,'children'))){
					return v;
				}
			}
		})
	}
}
module.exports = ReadSecondParentModuleDirName;

