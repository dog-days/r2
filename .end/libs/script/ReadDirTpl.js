var fs = require('fs');
var path = require('path')

class ReadDirTpl {
	constructor(config){
		if(!config){ config = { }}
		this.config = Object.assign(config,{
			ignoreFiles:[],
			ignoreFilesWithSffix:[]
		});
		this.setIgnoreInfo();	
	}

	run(){
		var filesInfo = this.getDirFilesInfo();	
		//console.log(filesInfo.index.tagsInfo.tagContents)
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
	 *	获取标签名,标签正则表达式
	 *@param {string} text 文件内容
	 *@return {object} 对象{ tagName : [标签名], tagRegex: [标签正则表达式],tagContents:[标签内容] }
	 */
	getTagsInfo(text){
		var indexTags = text.match(/\<!--(.*)?_begin--\>/g);
		if(indexTags && indexTags[0]){
			//存储各个标签名
			var tagName = [];
			indexTags.forEach(function(v){
				tagName.push(v.match(/\<!--(.*)_begin/)[1]);
			})
			//存放各个标签正则表达式
			var tagRegex = {};
			//存放各个标签内容
			var tagContents = {};
			tagName.forEach(function(v){
				var regex = new RegExp(`\<!--${v}_begin--\>([^^]+)\<!--${v}_end--\>`);
				tagRegex[v] = regex;
				//匹配内容
				tagContents[v] = text.match(regex)[1];	
			})
			var tagsInfo = {
				tagName,
				tagRegex,
				tagContents,
			};	
			return tagsInfo;
		}
		return { }
		//console.log(indexRegex)
	}
		
	/**
	 *	读取文件夹文件,和文件内容
	 *@return {object} 返回{文件名:{contents,tagsInfo}},tagsInfo参考getTagsInfo函数说明
	 */
	getDirFilesInfo (){
		var c_path = path.resolve(this.config.path);
		var files = fs.readdirSync(c_path);
		var filesObj = { }
		for(var i = 0;i<files.length;i++){
			var file = files[i];
			var filePath = path.resolve(c_path,file); 
			var stat =	fs.lstatSync(filePath);
			if(!stat.isDirectory()){
				//过滤忽略文件
				if(this.ignoreFiles.indexOf(file) == -1){
					var suffix = file.match(/\..*/)[0];
					//过滤忽略后缀名
					if(this.ignoreFilesWithSffix.indexOf(suffix) != -1){
						continue;
					}
					var contents = fs.readFileSync(filePath,{
						encoding : 'utf-8'
					})
					var index = file.replace(/\..*/,'');
					filesObj[index] = {
						contents : contents,
						tagsInfo : this.getTagsInfo(contents),
					}
				}
			}
		}
		return filesObj;
	}
}
module.exports = ReadDirTpl;

