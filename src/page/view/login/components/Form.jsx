import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Antd from 'antd'

class LoginForm extends Component {
	constructor(){
		super(); 
	}

	componentDidMount(){
		var _this = this;
	}
	componentWillUnmount(){
	}
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		return {
		}
	}
	events(){
		var _this = this;
		return{
			handleSubmit(){
				return function(e){
					e.preventDefault();
					var login = function(){
						let { targetProps,dispatch }= _this.props;
						_this.props.form.validateFields((errors, values) => {
							if (!!errors) {
								console.debug('Errors in form!!!');
								return;
							}
						});
					}
					login();
				}
			},
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps,login } = this.props;
		let { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
		let emailProps = require('validate/email')(this.props.form);
		let empty = require('validate/empty')(this.props.form);
		
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 23 },
		};
		var loading = false;
		if(login.isFetching){
			loading = login.isFetching;
		}
		return (
			<div className="login-register-form absolute login-form">
				<div className="login-register-title login-title">
					<br/>
					<span>
						欢迎使用R2框架	
					</span>
				</div>
				<Antd.Form className="login-register-form-inner" horizontal onSubmit={this.handleSubmit()} form={this.props.form}>
					
					<Antd.Form.Item  hasFeedback {...formItemLayout}>
						<Antd.Input { ...emailProps } name="email" placeholder="账号（邮箱）" />
					</Antd.Form.Item>
					
					<Antd.Form.Item  hasFeedback {...formItemLayout} className="mb0">
						<Antd.Input { ...empty("passwd","请输入密码！") } type="password" name="password" placeholder="密码"/>
					</Antd.Form.Item>
					
					<Antd.Form.Item  hasFeedback {...formItemLayout} className="mb0">
						<Link className="fr mr10" to="/forget">忘记密码</Link>
						<Link className="fr mr10" to="/register">注册</Link>
					</Antd.Form.Item>

					<Antd.Form.Item  {...formItemLayout}>
						<Antd.Button loading={ loading } className="fr btn-submit" type="primary" htmlType="submit">登陆</Antd.Button>
					</Antd.Form.Item>
				</Antd.Form>
			</div>
		)	
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    targetProps : state.get('loginForm'),
	    login : state.get('login'),
	};
}

LoginForm = connect(mapStateToProps)(LoginForm)
module.exports = Antd.Form.create()(LoginForm);
