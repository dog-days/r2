var fs = require('fs');
var path = require('path')
var fn = require("../../../../../../libs/function")
var Creator = require('./Creator')

class BasicCreator extends Creator{
	constructor(config){
		super(config);	
	}

	createIndexModule(){
		var _this = this;
		var tpl = this.tpls.index,	
			content = tpl.contents,	
			w_file = this.moduleDir + "/" + "index.jsx";
		//imports替换
		var imports = '',
			components = '';
		if(this.config.form){
			imports += tpl.tagsInfo.tagContents.index_import
							.replace("${import_var}",this.config.formId)
							.replace("${import_libs}","./components/Form");
			//console.log(tpl.tagsInfo.tagRegex.index_import);
			components = `<${this.config.formId} />`;
		}
		content = content.replace(tpl.tagsInfo.tagRegex.index_import,imports)
		content = content.replace("${components}",components)
		content = this.commonReplace(content);
		this.writeFile(w_file,content,'index')
		//console.log(content)
	}

	createFormModule(){
		var tpl = this.tpls.Form,	
			content = tpl.contents,	
			tagContents = tpl.tagsInfo.tagContents,
			tagRegex = tpl.tagsInfo.tagRegex,
			w_file = this.componentDir + "/" + "Form.jsx";
		var jsx = '',
			event = '',
			params = '';
		this.config.form.forEach(function(v){
			var v2 = fn.toUpperCase(v);
			jsx += tagContents.form_content.replace(/\$\{inputId\}/g,v2)
									.replace(/\$\{inputid\}/g,v)
			event += tagContents.form_handle.replace(/\$\{inputId\}/g,v2)
			params += tpl.tagsInfo.tagContents.form_params.replace(/\$\{inputid\}/g,v)
		})
		//jsx替换
		content = content.replace(tagRegex.form_content,jsx)
		//event替换
		content = content.replace(tagRegex.form_handle,event)
		//params替换
		content = content.replace(tagRegex.form_params,params)
		content = this.commonReplace(content);
		this.writeFile(w_file,content,'Form')
		//console.log(content)
	}

	createReducerModule(){
		var _this = this,
			tpl = this.tpls.reducer,	
			content = tpl.contents,	
			tagContents = tpl.tagsInfo.tagContents,
			tagRegex = tpl.tagsInfo.tagRegex,
			w_file = this.moduleDir + "/" + "reducer.js";
		var fetch = '',
			input = '';
		if(this.config.fetch){
			fetch += tagContents.reducer_fetch.replace(/\$\{MODULEID\}/g,this.config.MODULEID);
		}
		this.config.form && this.config.form.forEach(function(v){
			var v2 = "INPUT" + fn.toUpperCase(v,0,v.length) + _this.config.MODULEID;
			input += tagContents.reducer_input.replace(/\$\{const\}/g,v2)
		})
		content = content.replace(tagRegex.reducer_form,tagContents.reducer_form)
		content = content.replace(tagRegex.reducer_fetch,fetch)
		content = content.replace(tagRegex.reducer_input,input)
		content = this.commonReplace(content);
		this.writeFile(w_file,content,'reducer')
		//console.log(tagContents)
	}

	createActionModule(){
		var _this = this,	
			tpl = this.tpls.action,	
			content = tpl.contents,	
			tagContents = tpl.tagsInfo.tagContents,
			tagRegex = tpl.tagsInfo.tagRegex,
			w_file = this.moduleDir + "/" + "action.js";
		//imports替换
		var imports = '',
			fetch = '',
			_const = "", 
			input = ""; 
		if(this.config.fetch){
			imports += tagContents.action_import
							.replace("${import_var}","fetch")
							.replace("${import_libs}","isomorphic-fetch");
			_const += tagContents.action_const.replace(/\$\{const\}/g,"REQUEST"+this.config.MODULEID)
			_const += tagContents.action_const.replace(/\$\{const\}/g,"RECIEVE"+this.config.MODULEID)
			fetch += tagContents.action_fetch.replace(/\$\{MODULEID\}/g,this.config.MODULEID)
		}
		this.config.form && this.config.form.forEach(function(v){
			var v2 = "INPUT" + fn.toUpperCase(v,0,v.length) + _this.config.MODULEID;
			_const += tagContents.action_const.replace(/\$\{const\}/g,v2)
			input += tagContents.action_input.replace(/\$\{const\}/g,v2)
									.replace(/\$\{inputId\}/g,fn.toUpperCase(v))
									.replace(/\$\{inputid\}/g,v)
		})
		//console.log(tagRegex.action_import)
		//import替换
		content = content.replace(tagRegex.action_import,imports)
		//常量替换
		content = content.replace(tagRegex.action_const,_const)
		//input替换
		content = content.replace(tagRegex.action_input,input)
		//fetch替换
		content = content.replace(tagRegex.action_fetch,fetch)
		content = this.commonReplace(content);
		//console.log(tagContents)
		this.writeFile(w_file,content,'action')
	}

}
module.exports = BasicCreator;
