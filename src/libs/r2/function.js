import Immutable from 'immutable'
import { is } from 'immutable'
var fn = {
  /**
  * 根据传进来的Imutable数据,判断是否更新React组件
  * @param {Object} thisProps  
  * @param {Object} nextProps  
  * @param {Object} propsIndex props的索引 
  * @return {Boolean || undefined} true or undefined
  */
  shouldDataUpdate(thisProps,nextProps={},propsIndex){
    var thisData = thisProps[propsIndex];
    var nextData = nextProps[propsIndex];
    //if(thisData && nextData){
      //console.debug(thisData.toJS(),nextData.toJS())
    //}
    if (!is(thisData,nextData)) {
      return true;
    }
    return false;
  },
  /**
  * 根据传进来的Imutable数据,判断是否更新React组件
  * @param {Object || Imutable Object} state redux reducer 参数state 
  * @param {Object} action redux reducer参数 action 
  * @param {String} type action类型两种request和receive 
  * @param {Function} callbackBefore 本函数其他处理前执行的回调函数
  * @return {Imutable Object} merge后的Imutable对象 
  */
  imutableReducer(state,action,type,callbackBefore){
    callbackBefore && callbackBefore();
    var data = {};
    if(state.toJS){
      if(type == "request"){
      return state.mergeDeep(Immutable.fromJS(action))
      }
      if(type == "receive"){
      return state.merge(Immutable.fromJS(action))
      }
    }else{
      data = Object.assign({},state,action);
      var i_state = Immutable.fromJS(data)
      return i_state;   
    }
  },
  /*
  * locale翻译替换函数，根据当前str和配置的语言选项替换。
  * @param {string} str 需要替换的文字 
  */
  t(str){
    var locale = require("src/common/locale"); 
    var temp = {}
    locale.forEach((v,k)=>{
      temp[v] = k;
    })
    if(r2Common.language){
      var o = r2Common.language[temp[str]];
      if(o){
        return o;
      }
    }
    return str;
  }
}
module.exports = fn;
