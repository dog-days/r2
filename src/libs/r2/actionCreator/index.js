let commonAction = { } 
/**
 * 表单输入actionCreator 
 * @param {String} inputid redux action类型,唯一 
 * @param {String} value input等表单值 
 * @return {Object} redux action 结果 
 */
export function inputAction(inputid,value){
  var obj = {
    type : R2FORMINPUT,
  }
  obj[inputid] = value;
  return obj; 
}

/**
 * 清空数据actionCreator 
 * @param {Array} fields 需要清空的字段 
 * @return {Object} redux action 结果 
 */
export function clearFormData(fields){
  var obj = {
    type: R2CLEARFORMDATA 
  }
  fields.forEach(function(v){
    obj[v] = null;
  })
  return obj; 
}
/**
 * 请求数据actionCreator 
 * @param {String} _const redux action类型,唯一 
 * @param {String} type 定义类型,在相同reducer中唯一 
 * @param {Bulean} createData 是否情况receivePosts result数据 
 * @return {Function} (json) 返回函数参数为json对象
 */
export function requestPosts(_const,type,clearData=false) {
  return function(){
    var obj = Object.assign({},commonAction,{
      type: _const,
    });
    obj[type] = {
      fetched : false,
      isFetching : true,
    };
    if(clearData){
      obj[type].result = null; 
    }
    return obj;
  }
}
//存放receivePosts参数
let temp_const;
let temp_type = {};
/**
 * 成功获取数据actionCreator 
 * @param {String} _const redux action类型,唯一 
 * @param {String} type 定义类型,在相同reducer中唯一 
 * @return {Function} (json) 返回函数参数为json对象
 */
export function receivePosts(_const,type) {
  return function(json){
    if(!temp_type[_const]){
      temp_type[_const] = [];
    }
    temp_const = _const;
    //当前页面接收的所有type
    temp_type[_const].push(type);
    var obj = Object.assign({},commonAction,{
      type: _const,
      receivedAt: Date.now()
    });
    obj[type] = {
      fetched: true,
      isFetching: false,
      result: json,
    };
    return obj;
  }
}

/**
 * 批量清除请求数据actionCreator 
 * @param {String} _const redux action类型,唯一 
 * @param {String} type 定义类型,在相同reducer中唯一 
 * @return {Function} (json) 返回函数参数为json对象
 */
export function clearReceivePosts(_const,type) {
  if(!_const){
    _const = temp_const;
  }
  var obj = Object.assign({},commonAction,{
    type: _const,
  });
  if(!type){
    //批量设置为null
    temp_type[_const].forEach(v=>{
      obj[v] = null;
    })
  }else{
    obj[type] = null; 
  }
  return obj;
}


