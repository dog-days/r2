'use strict';

var path = require("path")
var fs = require("fs")

/**
 * @param {object} config 
 * {
 * 		path: [],//数组,查找的路径
 * 		fileName:"",//查找的文件名
 * } 
 * @this {Array} dirs 查找后的指定文件所有文件夹路径
 * @this {Array} filesPath 查找后的指定文件的所有文件路径
 */
class Script {
	constructor(config){
		this.config = config;
		//所有找到的文件夹路径数组
		this.dirs = [];
		//查找所指定文件后的路径
		this.filesPath = [];
		this.run();
	}	
    run(){
		this.config.path.forEach(v=>{
			this.getAllDiryPath(path.resolve(v));
		})
		try{
			this.dirs.map((v,k)=>{
				//判断指定文件是否存在
				var f_path = path.resolve(v,this.config.fileName)
				if(fs.existsSync(f_path)){
					this.filesPath.push(f_path.replace(/\\/g,"/"));
				}
			})
			// console.log(this.filesPath)
		}catch(e){
			console.log(e);
		}
	}
	/**
	 * getAllDiryPath 遍历给定的路径中所有的文件夹 
	 */
	getAllDiryPath(c_path){
		if(!fs.existsSync(c_path)){
			return;
		}
		try{
			var files = fs.readdirSync(c_path)
			files && files.forEach(v=>{
				var filePath = path.resolve(c_path,v); 
				var stat =	fs.lstatSync(filePath);
				if(stat.isDirectory()){
					this.dirs.push(filePath);
					this.getAllDiryPath(filePath);
				}
			})
		}catch(e){
			console.log(e)
		}
	}

}

module.exports = Script;





