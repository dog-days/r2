import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
import LoginForm from './components/Form'
require('antd/dist/antd.css')
require('css/base.scss')
require('css/main.scss')
require('css/login.scss')

class Login extends Component {
	constructor(props){
		super(props); 
	}

	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		return {
			
		}
	}
	/**
	 *	事件处理
	 */
	events(){
		var _this = this;
		return{
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		return (
			<div className="login-con">
				<div className="login-form-con">
					<LoginForm />
				</div>
			</div>
		)	
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	//console.debug(state.get('login'))
	return {
	    targetProps : state.get('login')
	};
}
Login = connect(mapStateToProps)(Login)
Login.defaultProps = {
	title: "登陆",
	layout: false,	
};
module.exports = Login; 
