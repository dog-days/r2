let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUEST = 'REQUESTMODEL'
export const RECIEVE = 'RECIEVEAMODEL'
export const size = 10 

//actionCreators
export function fetchData(params={},success) {
	var url = `http://localhost:7001/providemoduledata?size=${ size }`;
	//url参数拼接
	url = r2fn.params(url,params);
	return r2fetch({
		method: 'GET',
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'main_request'),receivePosts(RECIEVE,'main'),success)
}


