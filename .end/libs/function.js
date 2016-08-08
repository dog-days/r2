var fs = require('fs');
var path = require('path')

//设置忽略目录和文件
var ignoreDir = ['layout','sidebar'];
var ignoreFiles = ['.DS_Store'];
var ignoreFilesWithSffix = ['.swp'];


module.exports = {
	/**
	 * eachDir 遍历指定文件夹的文件和文件夹
	 * @param  {string} c_path 传进来的文件夹路径
	 * @return {Object}        返回文件夹内容信息对象，包含数组信息{name:文件名，path:路径，isDirectory:是否为文件夹}
	 */
	eachDir : function(c_path){
		if(fs.existsSync(c_path)){
			var files = fs.readdirSync(c_path);
			var data = files.map(function(file){
				var filePath = path.resolve(c_path,file); 
				var stat =	fs.lstatSync(filePath);
				if(stat.isDirectory()){
					if(ignoreDir.indexOf(file) == -1){
						//console.log(file)	 
						return {
							name: file,
							path: filePath,
							isDirectory: 1,
						}
					}
					return null;
				}else{
					if(ignoreFiles.indexOf(file) == -1){
						var suffix = file.match(/\..*/)[0];
						//过滤忽略后缀名
						if(ignoreFilesWithSffix.indexOf(suffix) == -1){
							return {
								name: file,
								path: filePath,
								isDirectory: 0,
							}
						}
					}
					return null;
				}
			}).filter(function(v,k){
				return v;
			})
			return data;
		}
	},
	/**
	 * toUpperCase 小写转大小 
	 * @param  {string} string 传进来的字符串
	 * @param  {Number} start  开始位置，默认0
	 * @param  {Number} end    介绍位置，默认1
	 * @return {string} 
	 */
	toUpperCase : function(string,start,end){
		if(!start){
			start = 0;
		}
		if(!end){
			end = 1;
		}
		var str1 = string.substr(start,end).toUpperCase();
		var str2 = string.substr(end);
		return str1 + str2;
	}
}

