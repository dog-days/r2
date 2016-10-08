import fn from "r2/function"
var output = {
  /**
   * antdTabelFieldBind Antd Table 简易键值绑定
   * @param  {Array}   data   二维json对象,原始数据
   * @param  {Objct}   columns  二维json对象,antd column设置
   * @param  {Function}  callback 参数为data遍历的值和data索引 
   * @return {Object}       加key后的对象
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
   * toUpperCase 小写转大写,默认只转第一个字母
   * @param  {String} string 传进来的字符串
   * @param  {Int}  start  开始位置，默认0
   * @param  {Int}  end  介绍位置，默认1
   * @return {string} 
   */
  toUpperCase(string,start=0,end=1){
    var str1 = string.substr(start,end).toUpperCase();
    var str2 = string.substr(end);
    return str1 + str2;
  },
  /**
   * params json对象(一级)拼接url ?后面的参数
   * @param  {String} url  需要拼接的url
   * @param  {Objct}  params 需要拼接的url json参数
   * @return {String}    拼接的url
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
   * @return {Array}    url解析后的参数
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
   * @return {Boolean}   true or false
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
   *  带宽比特单位转换为Kb,Mb,Gb单位
   *@param {int} t_value 转换值
   *@param {stirng} str 数据不存在替换字符串 
   */
  transformToKbMbGb(t_value,str="-"){
    let value = 0;
    if(t_value >= 1000 * 1000 * 1000){
      value = Math.round(t_value / 1000 / 1000 / 1000 * 100 ) / 100  + 'Gb';  
    }else if(t_value >= 1000 * 1000){
      value = Math.round(t_value / 1000 / 1000 * 100) / 100  + 'Mb';  
    }else if(t_value >= 1000){
      value = Math.round(t_value / 1000 * 100) / 100 + 'Kb';  
    }else if(t_value != 0){
      value = t_value + 'kbps';  
    }else if(t_value == 0){
      value = t_value;  
    }else if(!t_value || isNaN(t_value)){
      return str;
    }
    return value;
  },

  transformBandWidth(t_value,unit){
    var value = 0;
    if(unit === 'Gb'){
      value = Math.round(t_value / 1000 / 1000 / 1000 * 100 ) / 100  + '';  
    }else if(unit === 'Mb'){
      value = Math.round(t_value / 1000 / 1000 * 100) / 100  + '';  
    }else if(unit === 'Kb'){
      value = Math.round(t_value / 1000 * 100) / 100 + '';  
    }else {
      value = t_value;
    }
    return value;
  },
  /**
   *  流量或存储 字节单位转换为KB,MB,GB单位
   *@param {int} t_value 转换值
   */
  flowTransformToKbMBGB(t_value){
    let value = 0;
    if(t_value >= 1024 * 1024 * 1024){
      value = Math.round(t_value / 1024 / 1024 / 1024 * 100 ) / 100  + 'GB';  
    }else if(t_value >= 1024 * 1024){
      value = Math.round(t_value / 1024 / 1024 * 100) / 100  + 'MB';  
    }else if(t_value >= 1024){
      value = Math.round(t_value / 1024 * 100) / 100 + 'KB';  
    }else if(t_value != 0){
      value = t_value + 'B';  
    }
    return value;
  },
  /**
   * 秒转换成分，时，天  
   *@param {int} t_value 转换值
   *@param {stirng} str 数据不存在替换字符串 
   */
  secondTranformToMHD(t_value,str="-"){
    let value = 0;
    if(t_value > 60 * 60 * 24){
      value = Math.round(t_value / 60 / 60 / 24 * 100 ) / 100  + '天';
    }else if(t_value > 60 * 60){
      value = Math.round(t_value / 60 / 60 * 100 ) / 100  + '小时';  
    }else if(t_value > 60){
      value = Math.round(t_value / 60 * 100) / 100  + '分';  
    }else if(t_value != 0){
      value = t_value + '秒';  
    }else if(t_value == 0){
      value = t_value;  
    }else if(!t_value || isNaN(t_value)){
      return str;
    }
    return value;
  },
  /**
   *  生成随机数
   * @param {int} n 需要生成随机数的位数
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
   *  获取地址域名
   * @param {int} url 为地址
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
  /**
   * 交换数组指定的的两个键值位置,index2 > index1 下移，相反上移
   * @param {Array} arr 需要处理的数组
   * @param {Int} index1 索引位置1
   * @param {Int} index2 索引位置2
   * @return {Array} 返回处理的数组
   */
  swapArrayItem(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },
  
}
module.exports = Object.assign({},fn,output);
