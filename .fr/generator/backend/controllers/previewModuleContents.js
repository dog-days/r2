'use strict';
var path = require('path')
var parse = require('co-body');

/**
 * Module dependencies.
 */
module.exports = function* previewModuleContents(next) {
	var post = yield parse(this, { limit: '9kb' });
	post = JSON.parse(post);
	var msg = { }
	if(post.moduleid && post.module && post.module[0]){
		//处理模块和模板选择
		//二级目录以及一级处理
		var tplPath = ".fr/generator/backend/script/tpls/module/first";
		var savePath = "src/page/view";
		var saveType = "page";
		var createModuleObj = "AntdFirstCreator" 
		if(post.module.length == 3){
			tplPath = ".fr/generator/backend/script/tpls/module/";
			switch(post.module[0]){
				//Antd模板
				case "1":
					tplPath += "antd";
				break;
			}
			//1-1
			switch(post.module[1]){
				//一级模板
				case "1-1":
					tplPath += "/first";
					createModuleObj = "AntdFirstCreator"; 
				break;
				//二级模板
				case "1-2":
					tplPath += "/second/parent";
					createModuleObj = "AntdSecondParentCreator"; 
				break;
				//二级模板
				case "1-3":
					tplPath += "/second/child";
					createModuleObj = "AntdSecondChildCreator"; 
				break;
			}
			//模块生成后保存方式
			saveType = post.module[2];
			switch(saveType){
				case "page":
					savePath = "src/page/view";
				break;
				case ".fr":
					savePath = ".fr/generator/frontend/view";
				break;
				default:
					if(post.child){
						savePath = path.resolve(saveType,"children") ;
					}else{
						savePath = saveType;
					}
			}

		}
		var CreateModule = require('../script/generator/action/module-creator/'+createModuleObj)
		function basicSetting(){
			var obj = {}
			obj.savePath = path.resolve(savePath);
			obj.path = path.resolve(tplPath);
			return obj;
		}
		var setting = basicSetting();
		var params = {
			moduleId : post.moduleid,
			tabledata : post.tabledata,
			path : setting.path,
			savePath : setting.savePath,
			type : "toSave",
		} 
		if(post.inputs && post.inputs[0]){
			params.form = post.inputs;
		}
		if(post.fetch){
			params.fetch = post.fetch;
		}
		var createModule = new CreateModule(params);	
		msg = {
			error : createModule.error,
			moduleDir : createModule.moduleDir,
			msg : createModule.msg,
		}
	}else{
		msg = {
			ret : -1,
			error : "请填写表单！",
		}
	}
	this.body = msg;
	this.status = 200;
};
