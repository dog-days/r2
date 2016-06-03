import React from 'react'
import { is } from 'immutable'
/**
 *	此类规范化数据处理，事件绑定位置。数据处理类函数需要定义在类方法dataAdapter中，绑定事件需要统一在
 *	events中,动作统一在actions中，调用dataAdapter，events,actions中的方法直接在使用this就可以访问到。需要注意,当集成此类需要,在新建react组件
 *	的render方法中调用父类render方法。因为不调用，这些定义的方法无法热替换,通过defaultProps可以设置页面title
 * @function {getParamsOfId} 参考下面函数解析
 *@example
 * class Test exents Component{
 *		dataAdapter(){
 *			return {
 *				deal(){
 *					
 *				}
 *			}
 *		}
 *
 *		events(){
 *			return{
 *				switch(){
 *					
 *				}
 *			}
 *		}
 *
 *		render(){
 *			super.render();
 *		}
 * }
 */
class BasicComponent extends React.Component {
	
	constructor(props){
		super(props); 
		this.state = { }
		this.getParamsOfId(props);
		this.bindFunctions();
		if(props && props.title){
			document.title = props.title + props.titleSffix;
		}
	}

	shouldComponentUpdate(nextProps = {}, nextState = {}){
		const thisProps = this.props || {},
			thisState = this.state || {};

		if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
			Object.keys(thisState).length !== Object.keys(nextState).length) {
			return true;
		}

		for (const key in nextProps) {
			if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
		//console.debug(thisProps[key],nextProps[key])
				return true;
			}
		}

		for (const key in nextState) {
			if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
				return true;
			}
		}
		return false;
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

	bindFunctions(){
		if(this.dataAdapter){
			Object.assign(this,this.dataAdapter());
			if(!module.hot){
				this.dataAdapter = null;
			}
		}
		if(this.events){
			Object.assign(this,this.events());
			if(!module.hot){
				this.events = null;
			}
		}
		if(this.actions){
			Object.assign(this,this.actions());
			if(!module.hot){
				this.actions = null;
			}
		}

	}

	render(){
		if(module.hot){
			this.bindFunctions();
		}
	}

}

module.exports = BasicComponent
