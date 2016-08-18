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
		this.reducersName = [];
		this.reducers = [];
		this.run();
	}	

    run(){
    	this.filesPath.forEach(v=>{
 			var contents = fs.readFileSync(v,{
				encoding : 'utf-8'
			})
			var reducers = this.getReducersFunc(contents);
			reducers.forEach(r=>{
				var index = this.reducersName.indexOf(r);
				if(index != -1){
					console.error("重复的reducer名",r,v,this.reducers[index].absolutePath)
					this.error = true;
				}
				this.reducersName.push(r);
				var pre_path = this.dirPath[0];
				var r_path = v.split(this.dirPath[0]);
				if(!r_path[1]){
					r_path = v.split(this.dirPath[1]);
					pre_path = this.dirPath[1];
				}
				this.reducers.push({
					name: r,
					path: pre_path + r_path[1],
					absolutePath: v,
				})
			})
    	})
    	// console.log(this.reducers)
	}

	/**
	 *	提取reducers方法	
	 *@param {string} content reducer文件内容
	 *@return {array} 匹配的reducer方法名
	 */
	getReducersFunc(content){
		var con = content.match(/[^//][^//][^//]export(.*?)function(.*?)\(/g);
		var reducers = [];
		if(con){
			con.forEach(function(data){
				var re = data.split('function')[1].replace('(','')
												.replace(/\ /g,'');
				reducers.push(re);	
			})
		}
		//console.log(reducers)
		return reducers;
	}
}

module.exports = Script;





