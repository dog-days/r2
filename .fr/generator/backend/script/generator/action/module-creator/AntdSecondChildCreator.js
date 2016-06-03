
var fs = require('fs');
var path = require('path')
var fn = require("../../../../../../libs/function")
var Creator = require('./Creator')

class AntdSecondChildCreator extends Creator{
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
			params = '';
		this.config.form.forEach(function(v){
			var v2 = fn.toUpperCase(v);
			jsx += tagContents.form_content.replace(/\$\{inputId\}/g,v2)
									.replace(/\$\{inputid\}/g,v)
			params += tpl.tagsInfo.tagContents.form_params.replace(/\$\{inputid\}/g,v)
		})
		//jsx替换
		content = content.replace(tagRegex.form_content,jsx)
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
		var fetch = '';
		if(this.config.fetch){
			fetch += tagContents.reducer_fetch.replace(/\$\{MODULEID\}/g,this.config.MODULEID);
		}
		content = content.replace(tagRegex.reducer_fetch,fetch)
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
		var fetch = '';
		var j = 0,i; 
		if(this.config.fetch){
			fetch += tagContents.action_fetch.replace(/\$\{MODULEID\}/g,this.config.MODULEID)
			for(var k in this.config.fetch){
				var fetch_type = '';
				var v = this.config.fetch[k];
				if(v){
					i = j;
					if(i == 0){ i = ''; }
					if(tagContents['action_fetch_' + k]){
						fetch_type += tagContents['action_fetch_' + k].replace(/\$\{data_name\}/g,"main" + i)
					}
					j++;
				}
				//console.log('action_fetch_' + k)
				if(tagRegex['action_fetch_' + k]){
					content = content.replace(tagRegex['action_fetch_' + k],fetch_type)
				}
			}
		}
		//fetch替换
		content = content.replace(tagRegex.action_fetch,fetch)
		content = this.commonReplace(content);
		//console.log(tagContents)
		this.writeFile(w_file,content,'action')
	}

	createTableModule(){
		var _this = this,	
			tpl = this.tpls.tableDataSet,	
			content = tpl.contents,	
			tagContents = tpl.tagsInfo.tagContents,
			tagRegex = tpl.tagsInfo.tagRegex,
			w_file = this.dataSet + "/" + "tableDataSet.jsx";
		var data = JSON.parse(this.config.tabledata);
	//console.log(data.data.data)
		var columns = '';
		var data_first = data.data.data[0];
		if(data_first){
			for(var i in data_first){
				columns += tagContents.table_colums.replace(/\$\{columns_id\}/g,i);
			}
		}
		content = this.commonReplace(content);
		content = content.replace(tagRegex.table_colums,columns)
		this.writeFile(w_file,content,'tableDataSet')
	}

}
module.exports = AntdSecondChildCreator;

