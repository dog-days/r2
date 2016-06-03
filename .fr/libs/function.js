var Q = require('q')
var fs = require('fs');
var path = require('path')

//设置忽略目录和文件
var ignoreDir = ['layout','sidebar'];
var ignoreFiles = ['.DS_Store'];
var ignoreFilesWithSffix = ['.swp'];


module.exports = {
	/**
	 *	遍历文件夹文件，包括文件和文件夹,不建议使用，请使用eachFiles
	 *@params callback [function] 文件夹回调函数,function(dir){ }
	 *@params callback2 [function] 文件回调函数,function(file){ }
	 */
	each_file : function(path,callback,callback2){
		var deferred = Q.defer();
		var files = fs.readdirSync(path);
		files.map(function(file){
			var stat =	fs.lstatSync(path+file);
			if(stat.isDirectory()){
				if(ignoreDir.indexOf(file) == -1){
					//console.log(file)
					callback && callback(file);	
				}
			}else{
				if(ignoreFiles.indexOf(file) == -1){
					var flag = true;
					ignoreFilesWithSffix.forEach(function(value){
						if(file.indexOf(value) != -1){
							flag = false;
							return;
						}
					});
					if(flag){
						//console.log(file)
						callback2 && callback2(file);
					}
				}
			}
		})
		
		deferred.resolve(files);
		return deferred.promise;
	},
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
	 * eachFiles 遍历指定路径文件和文件夹
	 * @param  {string} c_path 传进来的文件夹路径
	 * @return {Object}        返回文件夹内容信息Promise对象，包含数组信息{name:文件名，path:路径，isDirectory:是否为文件夹}
	 */
	eachFiles : function(c_path){
		var promise = [1];
		if(fs.existsSync(c_path)){
			var files = fs.readdirSync(c_path);
			var promise = files.map(function(file){
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
			})
		}
		return Promise.all(promise);
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

