//input输入
export const R2FORMINPUT = 'R2FORMINPUT'
export const R2CLEARFORMDATA = 'R2CLEARFORMDATA'
export const R2STORAGE = 'R2STORAGE'
export const R2STORAGE2 = 'R2STORAGE2'

let commonAction = { } 

/**
 * 表单输入actionCreator 
 * @param {String} id redux action类型,唯一 
 * @param {*} value 任何类型值 
 * @return {Object} redux action 结果 
 */
export function store(id,value){
	var obj = {
		type : R2STORAGE,
	}
	obj[id] = value;
	return obj; 
}

export function store2(id,value){
	var obj = {
		type : R2STORAGE2,
	}
	obj[id] = value;
	return obj; 
}
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
 * @return {Function} () 返回函数参数为空
 */
export function requestPosts(_const,type) {
	return function(){
		var obj = Object.assign({},commonAction,{
			type: _const,
		});
		obj[type] = {
			fetched : false,
			isFetching : true,
		};
		return obj;
	}
}

/**
 * 成功获取数据actionCreator 
 * @param {String} _const redux action类型,唯一 
 * @param {String} type 定义类型,在相同reducer中唯一 
 * @return {Function} (json) 返回函数参数为json对象
 */
export function receivePosts(_const,type) {
	return function(json){
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

