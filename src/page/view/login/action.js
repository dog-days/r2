import fetch from 'isomorphic-fetch'
import * as temp from 'common/common'

export const CLEARLOGIN = 'CLEARLOGIN'
export const REQUESTLOGIN = 'REQUESTLOGIN'
export const RECIEVELOGIN = 'RECIEVELOGIN'
export const INPUTEMAILLOGIN = 'INPUTEMAILLOGIN'
export const INPUTPASSWORDLOGIN = 'INPUTPASSWORDLOGIN'

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

export function clearData(value){
	return {
		type : CLEARLOGIN,
		posts: null,
		email: '',
		password: '',
	};
}

export function inputEmail(value){
	return {
		type : INPUTEMAILLOGIN,
		email : value 
	};
}

export function inputPassword(value){
	return {
		type : INPUTPASSWORDLOGIN,
		password : value 
	};
}



function requestPosts() {
	return	Object.assign({},common,{
        type: REQUESTLOGIN,
		isFetching : true,
        posts: null,
	});
}

function receivePosts(json) {
	return	Object.assign({},common,{
        type: RECIEVELOGIN,
		fetched : true,
		isFetching : false,
        posts: json,
        receivedAt: Date.now()
	});
}

export function fetchData(_params={},callbackAllStatus,callback) {
	var url = temp.REQUESTURL + "/dev/v1/users/signin";
	return r2fetch({
		method: 'POST',
		params : _params,
		successMessage: false,
		callbackAllStatus: callbackAllStatus,
	}).dispatchFetchOne(url,requestPosts,receivePosts,callback)
}

export function logout(callbackAllStatus,successCallback) {
	var url = temp.REQUESTURL + "/dev/v1/users/logout";
	return r2fetch({
		method: 'POST',
		params : {},
		callbackAllStatus: callbackAllStatus,
		successMessage: false,
	}).dispatchFetchOne(url,requestPosts,receivePosts,successCallback)
}



