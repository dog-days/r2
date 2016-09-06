'use strict';
var fs = require('fs-extra')
var path = require("path")

/**
 * @param {Array} filesPath 指定文件的路径
 * @param {String} dirPath 指定文件的设置目录
 * @this {Array} reducersName reducer名数组
 * @this {Array} reducers reducer信息数组 
 */
class Script {
	constructor(config){
		this.config = config;
		this.run()
	}	

    run(){
		try{
			fs.copySync(this.config.src,this.config.dest,{
				clobber: false,
			})
			var files = fs.readdirSync(this.config.dest)
			files = files.filter(v=>{
				var stat =	fs.lstatSync(path.resolve(this.config.dest,v));
				if(stat.isDirectory()){
					return false;
				}
				if(v == ".DS_Store"){
					return false;
				}
				return true;
			})
			files.forEach(v=>{
				var t_path = path.resolve(this.config.dest,v)
				var contents = fs.readFileSync(t_path,{
					encoding : 'utf-8'
				})
				var patt = new RegExp(this.config.type,"g");
				contents = contents.replace(patt,this.config.replaceStr)
				if(this.config.layout != "false"){
					contents = contents.replace('layout: "main",',"layout: '"+this.config.layout+"',")
				}
				fs.writeFileSync(t_path,contents)
			})
			console.log("create view success",this.config.dest)
		}catch(e){
			console.error(e);
		}
	}
}

module.exports = Script;





