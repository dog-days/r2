let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
export const REQUEST = 'REQUESTLOGIN'
export const RECIEVE = 'RECIEVELOGIN'

export function login(params={},successCallback,callbackOtherStatus,callbackAllStatus) {
	var url = `http://localhost:7001/login`;
	return r2fetch({
		method: 'POST',
		params,
		callbackAllStatus,
	}).dispatchFetchOne(url,requestPosts(REQUEST,"login"),receivePosts(RECIEVE,"login"),successCallback,callbackOtherStatus)
}




