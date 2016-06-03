//公共方法
window.r2fn = require('./function');;
//公共Redux actionCreator
window.r2ActionCreator = require('src/page/commonAction');
window.r2Reducer = require('src/page/commonReducer');
//公共fetch
var Fetch = require('r2/fetch/Fetch');
window.r2fetch = function(option){
	return new Fetch(option)
};
//项目common,不同项目会不同
window.r2Common = require('common/common');
