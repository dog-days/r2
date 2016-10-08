'use strict';

var fs = require("fs")
var path = require("path")
var ReadDirTpl = require("../libs/script/ReadDirTpl")
var FindSpecificFileByDir = require("../libs/script/FindSpecificFileByDir")
var getRoutes = require("../libs/script/getRoutes")
var r2Common = "";
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
    var im = "",
      index = "";
    //指定layout是否是第一次
    var state = {};
    //处理一级route，判别方式为每个_route.js中是否有layout变量。
    this.routes.forEach(v=>{
      var layout = require(v.absolutePath).layout;
      if(!layout){
        if(v.name != "index"){
          im += tpl.tagsInfo.tagContents['require']
              .replace(/\$\{path\}/g,v.path)
        }else{
          index += tpl.tagsInfo.tagContents['index']
              .replace(/\$\{path\}/g,v.path)
        }
      }else{
        var layout_path = path.resolve(this.config.layoutPath,layout) 
        var child_routesPath = path.resolve(layout_path,'.child_routes.js');
                //.child_routes.js文件不存在，创建新的
                if(!fs.existsSync(layout_path)){
          fs.writeFileSync(child_routesPath,"module.exports = [\n\r  //routes//\n\r]")
                }
        if(fs.existsSync(layout_path)){
          if(!state[layout]){
            //首次初始化，文件内容
            fs.writeFileSync(child_routesPath,"module.exports = [\n\r  //routes//\n\r]")
            state[layout] = true;
          }
          var child_routes = fs.readFileSync(child_routesPath,{
            encoding : 'utf-8'
          })
          child_routes = child_routes.replace(/\/\/routes\/\//g,'require("'+v.path+'"), \n\r  //routes//')
          fs.writeFileSync(child_routesPath,child_routes)
        }else{
          console.error(v.absolutePath + "：不存在layout---"+layout)
        }
        
      }
    })
    content = content.replace(tpl.tagsInfo.tagRegex['require'],im)
    content = content.replace(tpl.tagsInfo.tagRegex['index'],index)
    // console.log(content)
    fs.writeFileSync(path.resolve(this.config.savePath),content)
    console.log("Create routes success!")
  }

}

module.exports = Script;




