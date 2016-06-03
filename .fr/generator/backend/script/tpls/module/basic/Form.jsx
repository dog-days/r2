import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'
class ${className}Form extends Component {
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
					let targetProps = _this.props.targetProps;
					var params = { 
						<!--form_params_begin-->
						${inputid} : targetProps.${inputid},
						<!--form_params_end-->
					}
					// _this.props.dispatch(actionCreator.fetchData(params))
				}
			},
			<!--form_handle_begin-->
			handle${inputId}Change(){
				return function(e){
					_this.props.dispatch(actionCreator.input${inputId}(e.target.value));
				}
			},
			<!--form_handle_end-->
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 18 },
		};

		return (
			<Antd.Form horizontal onSubmit={this.handleSubmit()}>
				<!--form_content_begin-->
				<Antd.Form.Item label="${inputid}："  {...formItemLayout}>
					<Antd.Input name="${inputid}" onChange={ this.handle${inputId}Change() }
						placeholder="请输入${inputid}" value={targetProps.${inputid}}/>
				</Antd.Form.Item>
				<!--form_content_end-->
				<Antd.Form.Item label="&nbsp;"  {...formItemLayout}>
					<Antd.Button className="fr btn-submit" type="primary" htmlType="submit">提交</Antd.Button>
				</Antd.Form.Item>
			</Antd.Form>
		)	
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    targetProps : state.${moduleId}Form
	};
}

${className}Form = connect(mapStateToProps)(${className}Form)
module.exports = Antd.Form.create()(${className}Form);
