import React from 'react'
import BasicComponent from './BasicComponent'
var commonAction = r2ActionCreator;
/**
 *	页面模块都应该继承这个类，该类继承越本框架最基层的BasicComponent。该封装了框架模块常用方法，路由参数（有改动），设置表单值
 * @var {r2Params} 解析react-router参数id所带的参数，参考本类中的方法getParamsOfId
 * @function {getParamsOfId} 参考下面函数解析
 * @prop {String} layout 默认为`page/layout`
 * @prop {String} titleSffix 默认需要配置
 */
class ModuleComponent extends BasicComponent {
	constructor(props){
		super(props); 
		this.getParamsOfId(props);
	}
	
	/**
	* 配合智能生成路由使用，生成的路由如果有两层默认参数是id,如果想传多参数，使用"_"来分割。
	* 如/test/start/1_2_3,之后可以直接使用this.r2Params访问
	*/
	getParamsOfId(props){
		var params = props && props.params;
		if(params && params.id){
			this.r2Params = params.id.split("_");
		}
	}

    /**
	 * state方式设置表单值 
	 * @param { String } inputid 自定义 
	 */
	handleInputState(inputid){
		return {
			onChange: (e)=>{
				var state = { }
				if(!e.target){
					state[inputid] = e;
					this.setState(state);
				}else if(e.target.type == "checkbox"){
					if(e.target.checked){
						state[inputid] = e.target.value;
						this.setState(state);
					}else{
						state[inputid] = null;
						this.setState(state);
					}
				}else{
					state[inputid] = e.target.value;
					this.setState(state);
				}
			},
			value: this.state[inputid], 
		}
	}
    /**
	 * Redex方式设置表单值
	 * @param { String } inputid 自定义 
	 */
	handleInputProps(inputid){
		var _this = this;
		return {
			onChange: function(e){
				//console.debug(e.target.type)
				if(!e.target){
					_this.props.dispatch(commonAction.inputAction(inputid,e));
				}else if(e.target.type == "checkbox"){
					if(e.target.checked){
						_this.props.dispatch(commonAction.inputAction(inputid,e.target.value));
					}else{
						_this.props.dispatch(commonAction.inputAction(inputid,null));
					}
				}else{
					_this.props.dispatch(commonAction.inputAction(inputid,e.target.value));
				}
			},
			value: _this.props.formInput[inputid], 
		}
	}

}

ModuleComponent.defaultProps = {
	layout: "page/layout",
	titleSffix: r2Common.suffixTitle,
};

module.exports = ModuleComponent
