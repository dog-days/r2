import deprecate from 'core-decorators/lib/deprecate';
/**
* 对Date的扩展，将 Date 转化为指定格式的String
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
* @example 
* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
*/
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var fn = {
	/**
	 *	日期格式转换
	 *@param {String||Int} time 时间戳（毫秒级）或 其他的日期的各种格式
	 *@param { String } fmt 格式如 yyyy-MM-dd hh:mm:ss.S ==> 2016-07-02 08:09:04.423,可自定义 
	 *@return 返回自定义的时间格式
	 */
	dateFormat(time,fmt) {
		var date = new Date(time);
		var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds(), //秒 
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	/**
	 * fieldSort Antd Table 简易键值绑定,deprecated,请使用antdTabelFieldBind
	 * @param  {Array}     data     二维json对象,原始数据
	 * @param  {Array}     fields   一维数组,需要展示的fields
	 * @param  {Objct}     columns  二维json对象,antd column设置
	 * @param  {Function}  callback 参数为data遍历的值和data索引 
	 * @return {Object}             Antd Table 需要的Json对象
	 */
	@deprecate
	fieldSort(data,fields,columns,callback){
		var reData = [];
		if(data && typeof data == "object" && data[0] && !data[0]._reData_){
			data.forEach(function(value,key){
				reData[key] = { };
				callback && callback(value,key);
				fields.forEach(function(v,k){
					if(data[key][v] || data[key][v] == 0){
						reData[key][v] = data[key][v];	
					}else{
					}
				})	
				//react组件，key值设定
				reData[key]['key'] = key;
				data[key]['_key_'] = key;
			})
			data[0]._reData_ = reData; 
		}else if(data && data[0] && typeof data == "object"){
			reData = data[0]._reData_;
		}
		columns && columns.forEach(function(value,key){
			columns[key]['dataIndex'] = fields[key];
			columns[key]['key'] = fields[key];
		})
		return reData;
	},
	/**
	 * antdTabelFieldBind Antd Table 简易键值绑定
	 * @param  {Array}     data     二维json对象,原始数据
	 * @param  {Objct}     columns  二维json对象,antd column设置
	 * @param  {Function}  callback 参数为data遍历的值和data索引 
	 * @return {Object}             加key后的对象
	 */
	antdTabelFieldBind(data,columns,callback){
		var reData = [];
		data.forEach(function(d,dk){
			reData[dk] = { };
			columns.forEach(function(c,ck){
				c.key = c.dataIndex;
				reData[dk]['key'] = dk;
				if(d[c.dataIndex] || d[c.dataIndex] == 0){
					reData[dk][c.dataIndex] = d[c.dataIndex];	
				}else{
					reData[dk][c.dataIndex] = "";
				}
			})
			callback && callback(reData[dk],dk);
		})
		return reData;
	},
	/**
	 * toUpperCase 小写转大写
	 * @param  {String} string 传进来的字符串
	 * @param  {Int}    start  开始位置，默认0
	 * @param  {Int}    end    介绍位置，默认1
	 * @return {string} 
	 */
	toUpperCase(string,start=0,end=1){
		var str1 = string.substr(start,end).toUpperCase();
		var str2 = string.substr(end);
		return str1 + str2;
	},
	/**
	 * [createAntdColumns  生成数字title,columns，用于隐藏]
	 * @param  {[Int]} num [description]
	 * @return {[Object]}     [json对象]
	 */
	createAntdColumns(num){
		var columns = [];
		for(var i = 0;i < num;i++){
			columns[i] = { }
			columns[i].title = i;
			columns[i].dataIndex = i;
			columns[i].key = i;
		}
		return columns;
	},
	/**
	 * params json对象(一级)拼接url ?后面的参数
	 * @param  {String} url    需要拼接的url
	 * @param  {Objct}  params 需要拼接的url json参数
	 * @return {String}        拼接的url
	 */
	params(url,params){
		var p = '';
		var i = 0;
		for(var key in params){
			var value = params[key];
			if(i == 0 && url.indexOf('?')==-1){
				p += '?'+key+'='+value;
			}else{
				p += '&'+key+'='+value;
			}
			i++;
		}
		//console.log(p)
		return url + p;
	},
	/**
	 * getUrlParams 获取url ?后面以"/"为分割符
	 * @param  {String} url url
	 * @return {Array}      url解析后的参数
	 */
	getUrlParams(url){
		var p = url.split('?')[0]
					.replace(/http(.*?)\:\/\/(.*?)\//g,'')
					.replace(/^\//g,'')
					.split('/');		
		return p;
	},
	/**
	 * isEmptyObj 判断对象是否为空
	 * @param  {Object}  obj json对象
	 * @return {Boolean}     true or false
	 */
	isEmptyObj(obj){
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},
	/**
	 * fullScreen 全屏
	 * @param  {Objct} element 选择器
	 */
	fullScreen(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}, 
	/**
	 * fullScreen 退出全屏
	 * @param  {Objct} element 选择器
	 */
	exitFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	},
	/**
	 *	带宽比特单位转换为Kb,Mb,Gb单位
	 *@param {int} t_value 转换值
	 */
	transformToKbMbGb(t_value,has8){
		if(!has8){
			t_value = t_value * 8;
		}
		let value = 0;
		if(t_value > 1000 * 1000 * 1000){
			value = Math.round(t_value / 1000 / 1000 / 1000 * 100 ) / 100  + 'Gb';	
		}else if(t_value > 1000 * 1000){
			value = Math.round(t_value / 1000 / 1000 * 100) / 100  + 'Mb';	
		}else if(t_value > 1000){
			value = Math.round(t_value / 1000 * 100) / 100 + 'Kb';	
		}else if(t_value != 0){
			value = t_value + '字节';	
		}
		return value;
	},
	/**
	 *	流量或存储 字节单位转换为KB,MB,GB单位
	 *@param {int} t_value 转换值
	 */
	flowTransformToKbMBGB(t_value){
		let value = 0;
		if(t_value > 1024 * 1024 * 1024){
			value = Math.round(t_value / 1024 / 1024 / 1024 * 100 ) / 100  + 'GB';	
		}else if(t_value > 1024 * 1024){
			value = Math.round(t_value / 1024 / 1024 * 100) / 100  + 'MB';	
		}else if(t_value > 1024){
			value = Math.round(t_value / 1024 * 100) / 100 + 'KB';	
		}else if(t_value != 0){
			value = t_value + '字节';	
		}
		return value;
	},
	/**
	 *	事件转换 秒单位转换为分,小时
	 *@param {int} t_value 转换值
	 */
	secondTranformToMH(t_value){
		let value = 0;
		if(t_value > 60 * 60){
			value = Math.round(t_value / 60 / 60 * 100 ) / 100  + '小时';	
		}else if(t_value > 60){
			value = Math.round(t_value / 60 * 100) / 100  + '分';	
		}else if(t_value != 0){
			value = t_value + '秒';	
		}
		return value;
	},
	/**
	 *	生成随机数
	 * @param [int] n 需要生成随机数的位数
	 */
	generateMixed(n){
		var res = "",
			chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		 for(var i = 0; i < n ; i ++) {
			 var id = Math.ceil(Math.random()*35);
			 res += chars[id];
		 }
		 return res;
	},
	/**
	 *	获取地址域名
	 * @param [int] n url 为地址
	 */
	getHost (url) { 
		var host = "null";
		if(typeof url == "undefined"
						|| null == url)
				url = window.location.href;
		var regex = /.*\:\/\/([^\/]*).*/;
		var match = url.match(regex);
		if(typeof match != "undefined"
						&& null != match)
				host = match[1];
		return host;
	},

	trigger(domId,evt){
		if(document.all) {
			document.getElementById(domId).evt();
		}else{
			var e = document.createEvent("MouseEvents");
		    e.initEvent(evt, true, true);
		    document.getElementById(domId).dispatchEvent(e);
		}
	},
	/**
	 * 交换数组指定的的两个键值位置,index2 > index1 下移，相反上移
	 * @param {Array} arr 需要处理的数组
	 * @param {index1} index1 索引位置1
	 * @param {index2} index2 索引位置2
	 * @return {Array} 返回处理的数组
	 */
	swapArrayItem(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    },

    newArray(start, end) {
		  let result = [];
		  for (let i = start; i < end; i++) {
		    result.push(i);
		  }
		  return result;
	}
}
module.exports = fn;
