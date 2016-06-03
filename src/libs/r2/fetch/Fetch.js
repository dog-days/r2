import override from 'core-decorators/lib/override';
import deprecate from 'core-decorators/lib/deprecate';
import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import * as Antd from 'antd'
import BasicFetch from './BasicFetch'
/**
 * 针对当前项目fetch封装 
 */
class Fetch extends BasicFetch {
	
	@override	
	dispatchFetchOne(url,request,receive,successCallback200,callbackOtherStatus,errorCallback){
		let msg = { };
		if(!successCallback200){
			successCallback200 = (json,dispatch)=>{
				if(this.option.successMessage){
					msg = {
						title: '提示',
						content: json.message,
					}
					Antd.message.success(json.message)
					//Antd.Modal.success(msg);
				}
			}
		}
		var callbackOtherStatusNot401 = (json,dispatch)=>{
			msg = {
				title: '提示',
				content: json.message,
			}
			if(json.status == 401){
				//Antd.Modal.info(msg);
				Antd.message.warn(json.message)
				setTimeout(function(){
					dispatch(push('/login'))
				},1000)
			}else{
				if(!callbackOtherStatus){
					Antd.message.error(json.message)
					//alert(0)
				}else{
					callbackOtherStatus(json,dispatch);
				}
			}
		}
		if(!errorCallback){
			errorCallback = (e)=>{
				msg = {
					title: '提示',
					content: "请求出错或网络连接有问题或发生未知错误！请重新尝试，或联系管理人员！",
				}
				Antd.message.error(msg.content)
				//Antd.Modal.error(msg);
			}
		}
		return super.dispatchFetchOne(url,request,receive,successCallback200,callbackOtherStatusNot401,errorCallback);
	}
	@override	
	dispatchFetchMore(urls,request,receive,successCallback200,callbackOtherStatus,errorCallback){
		let msg = { };
		if(!successCallback200){
			successCallback200 = (jsonArray,dispatch)=>{

			}
		}
		if(!callbackOtherStatus){
			callbackOtherStatus = (jsonArray,dispatch)=>{
				var i = 0;
				var j = 0;
				jsonArray.forEach(function(v,k){
					if(v.status == 401){
						if(i == 0){
							setTimeout(function(){
								dispatch(push('/login'))
							},1000)
						}
						i++;
					}else{
						if(j == 0){
							msg = {
								title: '提示',
								content: "请求出错！",
							}
							//Antd.Modal.error(msg);
							Antd.message.error(jsonArray[j].message)
						}
						j++;
					}
				})
			}
		}
		if(!errorCallback){
			errorCallback = (e)=>{
				msg = {
					title: '提示',
					content: "发生未知错误！",
				}
				//Antd.Modal.error(msg);	
				Antd.message.error(msg.content)
			}
		}
		return super.dispatchFetchMore(urls,request,receive,successCallback200,callbackOtherStatus,errorCallback);
	}
	/**
	 * [fetch 获取接口数据]
	 * @param  {[Function]} dispatch        [redux dispatch]
	 * @param  {[Function]} request         [redux action 设置开始请求数据状态]
	 * @param  {[Function]} receive         [redux action 设置请求已完成数据状态]
	 * @param  {[Function]} nologin         [未登录或登录失效处理]
	 * @param  {[Function]} successCallback [所有请求成功回调函数]
	 * @param  {[Function]} errorCallback   [请求失败回调函数]
	 */
	@deprecate
	fetch(dispatch,request,receive,nologin,successCallback,errorCallback) {
		var _this = this;
		dispatch(request())
		var urls = [],status = [];
		//console.debug(this.fetchOption)
		this.option.urls.forEach(function(v,k){
			let i = k;
			var re = fetch(v,_this.fetchOption).then(response => {
					status[i] = response.status;
					return response.json();
				})
			urls.push(re);
		})
		Promise.all(urls)
			.then(function(jsonArray){
				jsonArray.forEach(function(v,k){
					v.status = status[k];
				})
				let msg = { };
				if(!_this.option.successMessage){
					msg = {
						title: '提示',
						content: jsonArray[0].message,
					}
				}
				if(jsonArray[0].status == 200){
					dispatch(receive(jsonArray));
					if(_this.option.showMessage){
						Antd.Modal.success(msg);
					}
					successCallback && successCallback(jsonArray);
				}else if(jsonArray[0].status == 401){
					if(nologin){
						nologin();
					}else{
						Antd.Modal.info(msg);
						setTimeout(function(){
							dispatch(push('/login'))
						},1000)
					}
				}else{
					dispatch(receive([null]));
					if(errorCallback){
						errorCallback(msg);
					}else{
						Antd.Modal.error(msg);
					}
				}
			}).catch(function(e){
				console.error(e)
				dispatch(receive([null]));
				let msg = { };
				if(!_this.option.errorMessage){
					msg = {
						title: '错误提示',
						content: '发生了未知错误！',
					}
				}
				Antd.Modal.error(msg);
			});
	}



}

module.exports = Fetch; 
