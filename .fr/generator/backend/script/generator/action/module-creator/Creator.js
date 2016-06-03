var fs = require('fs');
var path = require('path')
var ReadModuleDirTpl = require("../../model/ReadModuleDirTpl")
var fn = require("../../../../../../libs/function")
/**
 * 模块生成器,初始运行方法run,infoSet,setTpls,createIndexModule,createReducerModule,createActionModule,createFormModule,
 * 后面的create*如果存在就会初始运行。
 * @param {Object} config 配置信息
 *				   config.moduleId 页面模块ID，
 *				   config.path 模板路径
 *				   config.savePath 生成模块的的路径 
 */
class Creator {
	constructor(config){
		this.config = config;
		if(!this.config) this.config = { }
		//this.config.moduleId = "test";
		//this.config.path = "../tpls/module/basic/";
		//this.config.savePath = "../tpls/";

		this.run();
	}

	run(){
		this.infoSet();
		this.setTpls();	
		this.mkdirNotExist();
		if(!this.error){
			this.createIndexModule && this.createIndexModule();
			this.createReducerModule && this.createReducerModule();
			this.createActionModule && this.createActionModule();
			if(this.config.form){
				this.createFormModule && this.createFormModule();
			}
			if(this.config.tabledata){
				this.createTableModule && this.createTableModule();
			}
		}
	}

	setTpls(){
		var tplObj = new ReadModuleDirTpl({
			path : this.config.path,
		});
		var tplInfo = tplObj.getDirFilesInfo();
		//console.log(tplInfo.index.tagsInfo)
		this.tpls = tplInfo;
	}
	/**
	 *	信息内容字段等处理
	 */
	infoSet(){
		this.config.classId = fn.toUpperCase(this.config.moduleId)	
		this.config.MODULEID = fn.toUpperCase(this.config.moduleId,0,this.config.moduleId.length)	
		this.config.formId = fn.toUpperCase(this.config.moduleId) + "Form";	
		this.moduleDir = path.resolve(this.config.savePath,this.config.moduleId);
		this.componentDir = this.moduleDir + '/' + 'components';
		this.dataSet = this.moduleDir + '/' + 'dataSet';
		//console.log(this.config)
	}
	/**
	 * 共同替换
	 */
	commonReplace(content){
		//模块名替换
		content = content.replace(/\$\{moduleId\}/g,this.config.moduleId)
		//类名替换
		content = content.replace(/\$\{className\}/g,this.config.classId)
		return content;
	}
	/**
	 *	创建不存在的目录
	 */
	mkdirNotExist(){
		try{
			if(this.config.type == "save"){
				if(!fs.existsSync(this.moduleDir)){
					fs.mkdirSync(this.moduleDir);
				}
				if(!fs.existsSync(this.componentDir)){
					fs.mkdirSync(this.componentDir);
				}
				if(!fs.existsSync(this.dataSetDir)){
					fs.mkdirSync(this.dataSetDir);
				}
			}
			this.msg = [];
		}catch(e){
			this.error = e;
		}
	}
	/**
	 *	文件按模块写入
	 *@param {string} path 写入路径
	 *@param {string} content 写入内容 
	 *@param {string} filename 文件名 
	 */
	writeFile(path,content,filename){
		var msg = { id : filename,path: path }
		try{
			content = content.replace(/(^\s*\n)|(^\s*\r\n)/g,'')
			//预览
			msg.status = 1;
			if(this.config.type == 'save'){
				fs.writeFileSync(path,content)
				//保存成功
				msg.status = 0;
			}
			msg.content = content;
		}catch(e){
			msg.status = e.errno;
			msg.error = e;
		}
		this.msg && this.msg.push(msg)
	}
}
module.exports = Creator;

//new CreateModule();

