let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUEST = 'REQUESTABOUT'
export const RECIEVE = 'RECIEVEAABOUT'
//actionCreators


export function fetchGetData(_params={},success) {
	var url = `${ r2Common.REQUESTURL }`;
	//url参数拼接
	url = r2fn.params(url,_params);
	return r2fetch({
		method: 'GET',
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'main'),receivePosts(RECIEVE,'main'),success)
}





