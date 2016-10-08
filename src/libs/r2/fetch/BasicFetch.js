import fetch from 'isomorphic-fetch'
/**
 * fetch封装 
 */
class BasicFetch {
  constructor(option={ }){
    if(!option.params){
      option.params = { }
    }
    if(!option.timeout){
      option.timeout = 5; 
    }
    if(!option.bodyType){
      option.bodyType = "json"; 
    }
    this.fetchOption = { }
    var params;
    if(!option.bodyType){
      option.bodyType = 'json';
    }
    if(option.bodyType == 'json'){
      params = JSON.stringify(option.params);
    }else if(option.bodyType == 'form'){
      params = option.params;
    }
    switch(option.method){
      //创建
      case 'POST':
      this.fetchOption = {
        method: "POST",
        body: params,
      }
      break;
      //更新
      case 'PUT':
      this.fetchOption = {
        method: "PUT",
        body: params,
      }
      break;
      //局部更新
      case 'PATCH':
      this.fetchOption = {
        method: "PATCH",
        body: params,
      }
      break;
      //请求资源
      case 'GET':
      this.fetchOption = {
        method: "GET",
      }
      break;
      //删除
      case 'DELETE':
      this.fetchOption = {
        method: "DELETE",
      }
      break;
      default:

    }
    if(option.headers){
      this.fetchOption.headers = option.headers;
    }else{
      this.fetchOption.headers = {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      };
    }
    if(!option.credentials){
      if(!option.nocredentials){
      //允许传跨域cookie
      this.fetchOption.credentials = "include";
      }else{
      this.fetchOption.credentials = "same-origin";
      }
    }else{
      this.fetchOption.credentials = option.credentials;
    }
    
    this.option = option;
  }
  /**
   * fetchOne 获取接口数据
   *@param  {String} url 目标请求url 
   *@param  {Function} successCallback200 请求http状态为200回调函数,返回参数（请求结果）
   *@param  {Function} successCallbackOtherStatus 请求http状态非200回调函数,返回参数（请求结果）
   *@param  {Function} errorCallback   请求失败回调函数,返回参数（捕捉的错误信息）
   */
  fetchOne(url,successCallback200,callbackOtherStatus,errorCallback) {
    var _this = this;
    var status = 0;
    fetch(url,_this.fetchOption).then(response => {
      status = response.status;
      return response.json();
    }).then((json)=>{
      json.status = status;
      if(status == 200){
      successCallback200 && successCallback200(json);
      }else{
      callbackOtherStatus && callbackOtherStatus(json);
      }
      this.option.callbackAllStatus && this.option.callbackAllStatus(json);
    }).catch((e)=>{
      this.option.callbackAllStatus && this.option.callbackAllStatus(null);
      errorCallback && errorCallback(e);
      console.error(e);  
    })
  }
  /**
   * fetchMore 获取多个接口数据
   *@param  {Array} urls 目标请求urls 
   *@param  {Function} successCallback200 请求http状态为200回调函数,返回参数（所有请求结果的数组）
   *@param  {Function} successCallbackOtherStatus 请求http状态非200回调函数,返回参数（所有请求结果的数组）
   *@param  {Function} errorCallback   请求失败回调函数,返回参数（捕捉的错误信息）
   */
  fetchMore(urls,successCallback200,callbackOtherStatus,errorCallback) {
    var _this = this;
    var status = [];
    var _urls = []
    urls.forEach(function(v,k){
      let i = k;
      var re = fetch(v,_this.fetchOption).then(response => {
        status[i] = response.status;
        return response.json();
      })
      _urls.push(re);
    })
    Promise.all(_urls)
      .then(function(jsonArray){
        var flag = true;
        jsonArray.forEach(function(v,k){
          v.status = status[k];
          if(v.status != 200){
          flag = false;
          }
        })
        if(flag){
          successCallback200 && successCallback200(jsonArray);
        }else{
          callbackOtherStatus && callbackOtherStatus(jsonArray);
        }
      }).catch(function(e){
        errorCallback && errorCallback(e);
        console.error(e)
      });
  }
  /**
   * dispatchFetchOne 获取接口数据,当构造函数参数带successMessage为true,弹出成功信息(包括非200,状态),默认处理不成功信息
   *@param  {String}   url 目标请求url 
   *@param  {Function} request 请求数据ActionCreator 
   *@param  {Function} receive 数据请求完成ActionCreator,无论http状态成不成功 
   *@param  {Function} successCallback200 请求http状态为200回调函数,返回参数（请求结果）
   *@param  {Function} callbackOtherStatus 请求http状态为非200回调函数,返回参数（请求结果）
   *@param  {Function} errorCallback  请求失败回调函数,返回参数（捕捉的错误信息）
   *@return {Function} (dispatch) redux dispatcher 
   */
  dispatchFetchOne(url,request,receive,successCallback200,callbackOtherStatus,errorCallback){
    return (dispatch)=>{
      dispatch(request());
      var _successCallback200 = (json)=>{
        successCallback200 && successCallback200(json,dispatch);
        dispatch(receive(json));
      }
      var _callbackOtherStatus = (json)=>{
        callbackOtherStatus && callbackOtherStatus(json,dispatch);  
        dispatch(receive(null));
      }
      var _errorCallback = (e)=>{
        errorCallback && errorCallback(e,dispatch);
        dispatch(receive(null));
      }
      this.fetchOne(url,_successCallback200,_callbackOtherStatus,_errorCallback);
    }
  }
  /**
   * dispatchFetchMore 获取接口数据,不弹出额外的请求成功（包括非200）信息提示,默认处理不成功信息
   *@param  {Array}  urls 目标请求urls
   *@param  {Function} request 请求数据ActionCreator 
   *@param  {Function} receive 数据请求完成ActionCreator,无论http状态成不成功 
   *@param  {Function} successCallback200 请求http状态为200回调函数,返回参数（所有请求结果的数组）
   *@param  {Function} callbackOtherStatus 请求http状态为非200回调函数,返回参数（所有请求结果的数组）
   *@param  {Function} errorCallback  请求失败回调函数,返回参数（捕捉的错误信息）
   *@return {Function} (dispatch) redux dispatcher 
   */
  dispatchFetchMore(urls,request,receive,successCallback200,callbackOtherStatus,errorCallback){
    return (dispatch)=>{
      dispatch(request());
        var _successCallback200 = (json)=>{
        successCallback200 && successCallback200(json,dispatch);
        dispatch(receive(json));
      }
      var _callbackOtherStatus = (json)=>{
        callbackOtherStatus && callbackOtherStatus(json,dispatch);  
        dispatch(receive(null));
      }
      var _errorCallback = (e)=>{
        errorCallback && errorCallback(e,dispatch);
        dispatch(receive(null));
      }
      this.fetchMore(urls,_successCallback200,_callbackOtherStatus,_errorCallback);
    }
  }
}

module.exports = BasicFetch; 
