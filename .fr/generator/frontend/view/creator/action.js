let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUEST = 'REQUESTCREATOR'
export const RECIEVE = 'RECIEVEACREATOR'
//actionCreators
//获取二级模块父模板文件夹名称
export function getSecondParentModule(success) {
	var url = "http://localhost:7001/getSecondParentModule";
	return r2fetch({
		method: 'GET',
		nocredentials: true,
		headers: { },
	}).dispatchFetchOne(url,requestPosts(REQUEST,'getSecondParentModule'),receivePosts(RECIEVE,'getSecondParentModule'),success)
}

//预览模块生成内容
export function previewModuleContents(params,success) {
	var url = "http://localhost:7001/previewModuleContents";
	return r2fetch({
		method: 'POST',
		params: params,
		nocredentials: true,
		headers: { },
	}).dispatchFetchOne(url,requestPosts(REQUEST,'preview'),receivePosts(RECIEVE,'preview'),success)
}
//保存模块生成内容
export function saveModuleContents(params,success) {
	var url = "http://localhost:7001/saveModuleContents";
	return r2fetch({
		method: 'POST',
		params: params,
		nocredentials: true,
		headers: { },
	}).dispatchFetchOne(url,requestPosts(REQUEST,'save'),receivePosts(RECIEVE,'save'),success)
}
