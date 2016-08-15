//es6支持IE10
Object.assign = Object.assign || require('object.assign/polyfill')(); // returns native method if compliant
Object.keys = Object.keys.shim || Object.keys; 
//兼容父类构造器不允许问题
(function() {
  var testObject = {};
  if (!(Object.setPrototypeOf || testObject.__proto__)) {
      var nativeGetPrototypeOf = Object.getPrototypeOf;

      Object.getPrototypeOf = function(object) {
          if (object.__proto__) {
              return object.__proto__;
          } else {
              return nativeGetPrototypeOf.call(Object, object);
          }
      }
  }
})();



//公共方法
window.r2fn = require('./function')
//公共fetch
var Fetch = require('r2/fetch/Fetch');
window.r2fetch = function(option){
	return new Fetch(option)
};
//项目common,不同项目会不同
window.r2Common = require('common/common');

//公共Redux actionCreator
var r2CommonActionCreator = require("r2/actionCreator")
window.r2ActionCreator = Object.assign({},r2CommonActionCreator,require('src/page/action'));
