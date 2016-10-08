let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUEST = 'REQUESTtableWithPagination'
export const RECIEVE = 'RECIEVEtableWithPagination'
export const size = 10 

//actionCreators
function fetchCommon(params={},success,callbackAllStatus) {
  var url = `http://localhost:7001/providemoduledata?size=${ size }`;
  //url参数拼接
  url = r2fn.params(url,params);
  return r2fetch({
    method: 'GET',
    callbackAllStatus,
  }).dispatchFetchOne(url,requestPosts(REQUEST,'main'),receivePosts(RECIEVE,'main'),success)
}
//分页中使用
var t_params; 
export function fetchData(params={},success) {
  t_params = params;
  return fetchCommon(params,success)  
}
export function fetchPaginationData(page,success,callbackAllStatus) {
  t_params.page = page;
  return fetchCommon(t_params,success,callbackAllStatus)  
}

