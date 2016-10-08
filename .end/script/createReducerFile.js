'use strict';

var fs = require("fs")
var path = require("path")
var ReadDirTpl = require("../libs/script/ReadDirTpl")
var FindSpecificFileByDir = require("../libs/script/FindSpecificFileByDir")
var getReducers = require("../libs/script/getReducers")

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
    this.getReducersName();
    if(!this.error){
      this.writeReducerFile();
      // console.log(this.reducers)
    }
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
   * getReducersName 获取所有的reducers名 
   */
  getReducersName(){
    var reducersObj = new getReducers(this.filesPath,this.config.path)
    this.reducers = reducersObj.reducers;
    this.error = reducersObj.error;
  }

  writeReducerFile(){
    var _this = this,
      name = "reducers" ;
    var tpl = this.tpls[name],  
      content = tpl.contents;  
    var require = "",
      reducer = "";
    this.reducers.forEach(v=>{
      require += tpl.tagsInfo.tagContents['reducer_import']
            .replace(/\$\{reducer\}/g,v.name)
            .replace(/\$\{path\}/g,v.path)
      reducer += tpl.tagsInfo.tagContents['reducer_reducer']
            .replace(/\$\{reducer\}/g,v.name)
    })
    content = content.replace(tpl.tagsInfo.tagRegex['reducer_import'],require)
    content = content.replace(tpl.tagsInfo.tagRegex['reducer_reducer'],reducer)
    fs.writeFileSync(path.resolve(this.config.savePath),content)
    console.log("create reducer success!")
  }

}

module.exports = Script;






