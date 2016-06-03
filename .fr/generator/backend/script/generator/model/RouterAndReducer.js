var fs = require('fs');
var path = require('path')
var ReadModuleDirTpl = require("../model/ReadModuleDirTpl")
var ReadViewOptions = require("../model/ReadViewOptions")
var fn = require("../../../../../libs/function")

class RouterAndReducer {
	constructor(config){
		this.config = config;
		if(!this.config) this.config = { }
		this.run();
	}

	run(){
		var _this = this;
		this.infoSet();
		this.setTpls();	
		this.mkdirNotExist();
		this.setViewOptions()
		if(!this.error){
			this.createChunks();
			this.createRoutes();
			this.createReducers();
		}
	}

	setTpls(){
		var tplObj = new ReadModuleDirTpl({
			path : this.config.tplPath,
		});
		var tplInfo = tplObj.getDirFilesInfo();
		this.tpls = tplInfo;
	}
	setViewOptions(){
		this.vpinfo = new ReadViewOptions({
			path: this.config.viewPath,
		}).getChildrenDirInfo()
		//console.log(JSON.stringify(this.vpinfo,null,2))
	}
	/**
	 *	信息内容字段等处理
	 */
	infoSet(){
		this.tempDir = path.resolve(".fr/.temp");
		this.chunksDir = path.resolve(".fr/.temp/chunks");
		this.pagePath = path.resolve(this.chunksDir,'page');
		this.frPath = path.resolve(this.chunksDir,'fr');
	}
	/**
	 * 共同替换
	 */
	commonReplace(content){
		return content;
	}
	/**
	 *	创建不存在的目录
	 */
	mkdirNotExist(){
		try{
			if(!fs.existsSync(this.tempDir)){
				fs.mkdirSync(this.tempDir);
			}
			if(!fs.existsSync(this.chunksDir)){
				fs.mkdirSync(this.chunksDir);
			}
			if(!fs.existsSync(this.pagePath)){
				fs.mkdirSync(this.pagePath);
			}
			if(!fs.existsSync(this.frPath)){
				fs.mkdirSync(this.frPath);
			}
			this.msg = [];
		}catch(e){
			this.error = e;
		}
	}
	/**
	 *	文件按模块写入
	 *@param [string] filename 文件名 
	 *@param [string] c_path 写入文件夹路径
	 *@param [string] content 写入内容 
	 */
	writeFile(filename,c_path,content){
		var t_path = path.resolve(c_path,filename);
		var msg = { id : filename,path:t_path }
		var message = '';
		try{
			content = content.replace(/(^\s*\n)|(^\s*\r\n)/g,'')
			fs.writeFileSync(t_path,content)
			//保存成功
			message = "保存成功！";
		}catch(e){
			msg.status = e.errno;
			//msg.error = e;
			message = "保存失败！";
		}
		this.msg && this.msg.push(msg)
		if(!this.load){
			this.count = 1;
			this.load = ".";
		}else{
			this.load += ".";
			this.count++;
		}
		console.log(this.count + " " + filename + " " + message)
	}
	/**
	 *	生成Reducers
	 */
	createReducers(){
		var _this = this,
			name = "reducers_tpl" ;
		var tpl = this.tpls[name],	
			content = tpl.contents;	
		var import1 = '';
		var import2 = '';
		var reducer = '';
		var reducer_index = '';
		this.vpinfo.forEach(function(v,k){
			if(v.reducers[0]){
				switch(v.type){
					case 'pageView':
						import1 += tpl.tagsInfo.tagContents['reducer_import']
								.replace(/\$\{var\}/g,v.name)
								.replace(/\$\{dirname\}/g,v.name)
						break;
					case '.frView':
						import2 += tpl.tagsInfo.tagContents['reducer_import2']
								.replace(/\$\{var\}/g,v.name)
								.replace(/\$\{dirname\}/g,v.name)
						break;
				}
				v.reducers.forEach(function(v2,k2){
					reducer += tpl.tagsInfo.tagContents['reducer_reducer']
								.replace(/\$\{var\}/g,v.name)
								.replace(/\$\{reducer\}/g,v2)
				})
				//console.log(_this.reducerList[v])
				if(v.children){
					v.children.forEach((cv,ck)=>{
						//console.log(cv)
						var j = cv.name;
						var _var = v.name+"_"+j;
						var _dir = v.name+"/children/"+j;
						switch(v.type){
							case 'pageView':
								import1 += tpl.tagsInfo.tagContents['reducer_import']
										.replace(/\$\{dirname\}/g,_dir)
										.replace(/\$\{var\}/g,_var)
								break;
							case '.frView':
								import2 += tpl.tagsInfo.tagContents['reducer_import2']
										.replace(/\$\{dirname\}/g,_dir)
										.replace(/\$\{var\}/g,_var)
								break;
						}
						cv.reducers.forEach((cv2,ck2)=>{
							//对index模块特殊处理
							if(j == "index"){
								//console.log(j,cv2)
								reducer_index += tpl.tagsInfo.tagContents['reducer_reducer_index']
											.replace(/\$\{var\}/g,_var)
											.replace(/\$\{reducer\}/g,cv2)
							}else{
								reducer += tpl.tagsInfo.tagContents['reducer_reducer']
											.replace(/\$\{var\}/g,_var)
											.replace(/\$\{reducer\}/g,cv2)
							}
						})
					})
				}
			}
		})
		content = content.replace(tpl.tagsInfo.tagRegex['reducer_import'],import1)
		content = content.replace(tpl.tagsInfo.tagRegex['reducer_import2'],import2)
		content = content.replace(tpl.tagsInfo.tagRegex['reducer_reducer'],reducer)
		content = content.replace(tpl.tagsInfo.tagRegex['reducer_reducer_index'],reducer_index)
		this.writeFile('reducers.js',this.config.reducerPath,content);
	}
	/**
	 *	生成routes
	 */
	createRoutes(){
		var _this = this,
			name = "routes_tpl" ;
		var tpl = this.tpls[name],	
			content = tpl.contents;	
		var require = '';
		var index = '';
		this.vpinfo.forEach((v,k)=>{
			//console.log(v)
			var v_t = v.name; 
			switch(v.type){
				case 'pageView':
					v_t = "page/"+v.name;
					break;
				case '.frView':
					v_t = "fr/"+v.name;
					break;
			}
			if(v.name != 'index'){
				require += tpl.tagsInfo.tagContents['reducer_reducer']
								.replace(/\$\{dirname\}/g,v_t)
			}
			if(v.name == 'index'){
				index = tpl.tagsInfo.tagContents['reducer_index']
			}
		})
		content = content.replace(tpl.tagsInfo.tagRegex['reducer_reducer'],require)
		content = content.replace(tpl.tagsInfo.tagRegex['reducer_index'],index)
		this.writeFile('routes.js',this.config.routePath,content);
	}
	/**
	 *	生成每个页面的chunks
	 */
	createChunks(){
		var _this = this,
			tagid,
			tplname,
			child_contents,
			contents;
		var savePath;
		this.vpinfo.forEach((v,k)=>{
			switch(v.type){
				case 'pageView':
					savePath = this.pagePath;
					break;
				case '.frView':
					savePath = this.frPath;
					break;
			}
			if(v.children){
				var children = [];
				v.children.forEach((v2,k2)=>{
					tplname = 'chunk_child'
					tagid = 'chunk_child'
					child_contents = this.getChunkChildContents(v.type,{
						tplname,
						tagid,
					},v.name + "/children/" + v2.name,v2.name)	
					children.push(v2.name)
					var savePath_t = path.resolve(savePath,v.name);
					if(!fs.existsSync(savePath_t)){
						fs.mkdirSync(savePath_t);
					}
					this.writeFile(v2.name+".js",savePath_t,child_contents);
				})
				tplname = 'chunk_parent'
				tagid = 'chunk_parent'
				contents = this.getChunkFileContents(v.type,{
					tplname,
					tagid,
				},v.name,children)	
				this.writeFile(v.name+".js",savePath,contents);
			}else{
				tplname = 'chunk'
				tagid = 'chunk'
				//console.log(v.name)
				contents = this.getChunkFileContents(v.type,{
					tplname,
					tagid,
				},v.name)	
				this.writeFile(v.name+".js",savePath,contents);
			}
		})
	}
	/**
	 * 获取第二级chunks文件内容,稍微的跟一级的有点不同之处
	 * @param {String} type 模块类型,就是放模块的位置类型
	 * @param {String} option 模板选项 包括模板名（级文件名）和标签名 
	 * @param {String} dirname 第一级文件夹，即最上级模块文件夹（单独一个也没模块），目前框架最多两级 
	 * @param {String} child_dirname 第二级文件夹,在children后的文件夹 
	 */
	getChunkChildContents(type,option,dirname,child_dirname){
		var content = this.getChunkFileContents(type,option,dirname)
									.replace(/\$\{child_dirname\}/g,child_dirname)
		if(child_dirname == "index"){
			content = content.replace(/path\:(.*)\,/,'',content);	
			//console.log(content)
		}
		return content;
	}
	/**
	 * 获取第一级chunks文件内容
	 * @param {String} type 模块类型,就是放模块的位置类型
	 * @param {String} option 模板选项 包括模板名（级文件名）和标签名 
	 * @param {String} dirname 第一级文件夹，即最上级模块文件夹（单独一个也没模块），目前框架最多两级 
	 * @param {String} child_dirname 第二级文件夹,在children后的文件夹 
	 */
	getChunkFileContents(type,option,dirname,child_dirname){
		switch(type){
			case '.frView':
				option.tplname = option.tplname + "_frontend"
				option.tagid = option.tagid + "_frontend"
				break;
			default:
		}
		var _this = this;
		var tpl = this.tpls[option.tplname],	
			content = tpl.contents;	
		var chunk_content = '';
		chunk_content += tpl.tagsInfo.tagContents[option.tagid]
						.replace(/\$\{dirname\}/g,dirname)
		content = content.replace(tpl.tagsInfo.tagRegex[option.tagid],chunk_content)
		var chunk_child_content = '';
		var index = '';
		if(child_dirname){
			child_dirname.forEach(function(v,k){
				if(v != "index"){
					chunk_child_content += tpl.tagsInfo.tagContents[option.tagid+"_child"]
							.replace(/\$\{child_dirname\}/g,v)
							.replace(/\$\{dirname\}/g,dirname)
				}else{
					index += tpl.tagsInfo.tagContents[option.tagid+"_index"]
							.replace(/\$\{dirname\}/g,dirname)
				}
			})
		}
		content = content.replace(tpl.tagsInfo.tagRegex[option.tagid+'_child'],chunk_child_content)
		content = content.replace(tpl.tagsInfo.tagRegex[option.tagid+'_index'],index)
		if(dirname == "index"){
			content = content.replace(/path\:(.*)\,/,'',content);	
			//console.log(content)
		}
		return content;
	}
}
module.exports = RouterAndReducer;


