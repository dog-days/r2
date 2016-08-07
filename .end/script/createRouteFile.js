'use strict';

import fs from "fs"
import path from "path"
import ReadDirTpl from "../libs/script/ReadDirTpl"
import FindSpecificFileByDir from "../libs/script/FindSpecificFileByDir"
import getRoutes from "../libs/script/getRoutes"

class Script {
	constructor(config){
		this.config = config;
		this.run();
	}	

    run(){
    	try{
    		this.setTpls();
			var findSpecificFileByDir = new FindSpecificFileByDir(this.config)
			this.filesPath = findSpecificFileByDir.filesPath;
			this.getRoutesName();
			if(!this.error){
				this.writeRouteFile();
				// console.log(this.routes)
			}
			// console.log(this.filesPath)
    	}catch(e){
    		console.log(e);
    	}
	}

	setTpls(){
		var tplObj = new ReadDirTpl({
			path : this.config.tplPath,
		});
		var tplInfo = tplObj.getDirFilesInfo();
		this.tpls = tplInfo;
		// console.log(this.tpls)
	}

	/**
	 * getRoutesName 获取所有的reducers名 
	 */
	getRoutesName(){
		var routesObj = new getRoutes(this.filesPath,this.config.path)
		this.routes = routesObj.routes;
		this.error = routesObj.error;
	}

	writeRouteFile(){
		var _this = this,
			name = "routes" ;
		var tpl = this.tpls[name],	
			content = tpl.contents;	
		var require = "",
			index = "";
		this.routes.forEach(v=>{
			if(v.name != "index"){
				require += tpl.tagsInfo.tagContents['require']
						.replace(/\$\{path\}/g,v.path)
			}else{
				index += tpl.tagsInfo.tagContents['index']
						.replace(/\$\{path\}/g,v.path)
			}
		})
		content = content.replace(tpl.tagsInfo.tagRegex['require'],require)
		content = content.replace(tpl.tagsInfo.tagRegex['index'],index)
		// console.log(content)
		fs.writeFileSync(path.resolve(this.config.savePath),content)
		console.log("Create routes success!")
	}

}

module.exports = Script;




