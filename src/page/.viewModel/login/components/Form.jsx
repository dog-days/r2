import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import Cookie from 'js-cookie'
import * as Antd from 'antd'
import * as actionCreator from '../action'

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
				return (e)=>{
					e.preventDefault();
					var login = ()=>{
						let { targetProps,dispatch }= this.props;
						this.props.form.validateFields((errors, values) => {
							console.debug(values)
							if (!!errors) {
								console.debug('Errors in form!!!');
								return;
							}
							var params = {
								account: values.acount,
								password: values.password,
							}
							this.props.dispatch(actionCreator.login(params,(successJson)=>{
								Antd.message.success(successJson.message || "登陆成功！")	
								Cookie.set("uid",successJson.data.id,{ expires: 7 ,path:"/"})
								setTimeout(()=>{
									this.props.dispatch(push("/"))
								},100)
							},(otherJson)=>{
								this.setState({
									errorMessage: otherJson.message,
								})	
							}))
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
		let { targetProps } = this.props;
		let { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
		let empty = require('validate/empty')(this.props.form);
		
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 23 },
		};
		var loading = false;
		if(targetProps.isFetching){
			loading = targetProps.main && targetProps.main.isFetching;
		}
		return (
			<div className="absolute login-form">
				<div className="login-title">
					<br/>
					<span>
						欢迎使用R2框架	
					</span>
				</div>
				<Antd.Form className="login-form-inner" horizontal onSubmit={this.handleSubmit()}>
					{
						this.state.errorMessage &&
						<Antd.Form.Item {...formItemLayout} className="mb0">
							<Antd.Alert message={this.state.errorMessage} type="error" showIcon closable/>
						</Antd.Form.Item>
					}
					
					<Antd.Form.Item {...formItemLayout} className="mb0">
						<Antd.Input { ...empty("acount","请输入用户名！") } name="acount" placeholder="用户名" />
					</Antd.Form.Item>
					
					<Antd.Form.Item {...formItemLayout} className="mb0 mt15">
						<Antd.Input { ...empty("password","请输入密码！") } type="password" name="password" placeholder="密码"/>
					</Antd.Form.Item>
					
					<Antd.Form.Item  {...formItemLayout} className="mb0 mt15">
						<Antd.Button loading={ loading } className="fr btn-submit" type="primary" htmlType="submit">登录</Antd.Button>
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
	    targetProps : state.get('login'),
	};
}

LoginForm = connect(mapStateToProps)(LoginForm)
module.exports = Antd.Form.create()(LoginForm);
