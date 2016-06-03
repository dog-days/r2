<!--action_fetch_begin-->
let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUEST = 'REQUEST${MODULEID}'
export const RECIEVE = 'RECIEVEA${MODULEID}'
//actionCreators
<!--action_fetch_end-->
<!--action_fetch_get_begin-->
export function fetchGetData(_params={},success) {
	var url = `${ r2Common.REQUESTURL }`;
	//url参数拼接
	url = r2fn.params(url,_params);
	return r2fetch({
		method: 'GET',
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'${data_name}'),receivePosts(RECIEVE,'${data_name}'),success)
}
<!--action_fetch_get_end-->
<!--action_fetch_post_begin-->
export function fetchPostData(_params={},success) {
	var url = `${ r2Common.REQUESTURL }`;
	return r2fetch({
		method: 'POST',
		params: _params,
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'${data_name}'),receivePosts(RECIEVE,'${data_name}'),success)
}
<!--action_fetch_post_end-->
<!--action_fetch_post_form_begin-->
export function fetchPostFormData(_params={},success) {
	var url = `${ r2Common.REQUESTURL }`;
	return r2fetch({
		method: 'POST',
		params: _params,
		bodyType: "form",
		headers:{},
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'${data_name}'),receivePosts(RECIEVE,'${data_name}'),success)
}
<!--action_fetch_post_form_end-->
<!--action_fetch_put_begin-->
export function fetchPutData(_params={},success) {
	var url = `${ r2Common.REQUESTURL }`;
	return r2fetch({
		method: 'PUT',
		params: _params,
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'${data_name}'),receivePosts(RECIEVE,'${data_name}'),success)
}
<!--action_fetch_put_end-->
<!--action_fetch_patch_begin-->
export function fetchPutData(_params={},success) {
	var url = `${ r2Common.REQUESTURL }`;
	return r2fetch({
		method: 'PATCH',
		params: _params,
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'${data_name}'),receivePosts(RECIEVE,'${data_name}'),success)
}
<!--action_fetch_patch_end-->
<!--action_fetch_delete_begin-->
export function fetchPutData(_params={},success) {
	var url = `${ r2Common.REQUESTURL }`;
	return r2fetch({
		method: 'PATCH',
		params: _params,
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'${data_name}'),receivePosts(RECIEVE,'${data_name}'),success)
}
<!--action_fetch_delete_end-->