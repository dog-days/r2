var fs = require('fs');
var path = require('path')
var fn = require("../../../../../libs/function")

class ReadViewOptions {
	constructor(config){
		if(!config){ config = { }}
		this.config = Object.assign(config,{
			ignoreFiles:[],
			ignoreFilesWithSffix:[]
		});
		this.setIgnoreInfo();	
	}

	/**
	 *	文件忽略设置
	 */
	setIgnoreInfo(){
		this.ignoreFiles = ['.DS_Store'];
		this.ignoreFilesWithSffix = ['.swp'];
		this.ignoreFiles = this.ignoreFiles.concat(this.config.ignoreFiles); 
		this.ignoreFilesWithSffix = this.ignoreFilesWithSffix.concat(this.config.ignoreFilesWithSffix); 
	}
	/**
	 *	提取reducers方法	
	 *@param [string] content reducer文件内容
	 *@return [array] 匹配的reducer方法
	 */
	getReducersFunc(content){
		var con = content.match(/export(.*?)function(.*?)\(/g);
		var reducers = [];
		if(con){
			con.forEach(function(data){
				var re = data.split('function')[1].replace('(','')
												.replace(/\ /g,'');
				reducers.push(re);	
			})
		}
		return reducers;
	}
	
	getChildrenDirInfo(){
		var data = this.getDirInfo(this.config.path);
		data.forEach((v,k)=>{
			if(fs.existsSync(path.resolve(v.path,'children'))){
				var cdata = this.getDirInfo([path.resolve(v.path,'children')]); 
				cdata.forEach((v2,k2)=>{
		//console.log(JSON.stringify(v2,null,2))
					if(v2.name){
						v.children || (v.children = []); 
						v.children.push(v2);
					}
				})
			}
		})
		//console.log(JSON.stringify(data,null,2))
		return data;
	}

	getDirInfo(c_paths){
		var data = [];
		var tdata; 
		for(var k in c_paths){
			tdata = fn.eachDir(c_paths[k]);
			tdata.forEach(t=>{
				t.type = k;
			})
			data.push(tdata);
		}
		data = Array.prototype.concat.apply([],data)
		data.filter((v,k)=>{
			return v.isDirectory && fs.existsSync(path.resolve(v.path,'index.jsx'));
		})
		data.forEach((v,k)=>{
			var temppath = path.resolve(v.path,"reducer.js")
			if(fs.existsSync(temppath)){
				var reducer_contents = fs.readFileSync(temppath,{
					encoding : 'utf-8'
				});
				v.reducers = this.getReducersFunc(reducer_contents)
			}else{
				v.reducers = []; 
			}
		})
		//console.log(JSON.stringify(data,null,2))
		return data;
	}
}
module.exports = ReadViewOptions;

//new ReadViewOptions({
	//path: {
		//"pageView": path.resolve('src/page/view'),
		//".frView": path.resolve('.fr/generator/frontend/view'),
	//},
//}).getChildrenDirInfo()
