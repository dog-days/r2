import React from 'react'
import Component from 'common/FormComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'

class Form extends Component {
	constructor(props){
		super(props); 
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
					let targetProps = this.props.formInput; 
					this.props.form.validateFieldsAndScroll((errors, values) => {
						//console.debug(values);
						if (!!errors) {
							console.log('Errors in form!!!');
							return;
						}	
						var params = { 
							<!--form_params_begin-->
							${inputid} : targetProps.${inputid},
							<!--form_params_end-->
						}
						// _this.props.dispatch(actionCreator.fetchData(params))
					}) 
				}
			},
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		var mainFetching = false;
		if(targetProps && targetProps.main){
			mainFetching = targetProps.main.isFetching ;
		}	
		
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 18 },
		};
		let emptyInput = require('validate/empty')(this.props.form);
		return (
			<Antd.Form horizontal onSubmit={this.handleSubmit()} cclassName="${moduleId}-form-con mt15" form={this.props.form}>
				<!--form_content_begin-->
				<Antd.Form.Item label="${inputid}："  {...formItemLayout}>
					<Antd.Input  name="${inputid}" placeholder="请输入${inputid}"
						{...emptyInput("${inputid}")} { ...this.handleInputProps('${inputid}') }/>
				</Antd.Form.Item>
				<!--form_content_end-->
				<Antd.Form.Item label="&nbsp;"  {...formItemLayout}>
					<Antd.Button loading={mainFetching} className="btn-submit" 
							type="primary" htmlType="submit">提交</Antd.Button>
				</Antd.Form.Item>
			</Antd.Form>
		)	
    }
}

var ReduxForm = connect((state)=>{
	return {
	    formInput : state.formInput,
	    targetProps : state.${moduleId},
	};
})(Form)
module.exports = Antd.Form.create()(ReduxForm);



