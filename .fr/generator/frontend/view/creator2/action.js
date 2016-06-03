import fetch from 'isomorphic-fetch'
export const REQUESTCREATOR = 'REQUESTCREATOR'
export const RECIEVECREATOR = 'RECIEVECREATOR'
export const INPUTMODULEIDCREATOR = 'INPUTMODULEIDCREATOR'

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

export function inputModuleId(value){
	return {
		type : INPUTMODULEIDCREATOR,
		moduleId : value 
	};
}

function requestPosts(params={}) {
	return	Object.assign({},common,{
        type: REQUESTCREATOR,
		isFetching : true,
	});
}

function receivePosts(params={},json) {
	return	Object.assign({},common,{
        type: RECIEVECREATOR,
		fetched : true,
		isFetching : false,
        posts: json,
        receivedAt: Date.now()
	});
}

export function fetchData(_params={}) {
    return dispatch => {
        dispatch(requestPosts(_params))
		var url = "http://localhost:7001/creator";
		return fetch(url,{
				method: 'POST',
				body: JSON.stringify(_params)
			})
            .then(response => response.json())
            .then(function(json){
				dispatch(receivePosts(_params,json));
			}).catch(function(e){
				console.debug('parsing failed', e)
			})
    }
}
