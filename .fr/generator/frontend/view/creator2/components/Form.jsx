import React from 'react'
import ReactDOM from 'react-dom'
import ModuleComponent from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'
import Prism from 'prismjs'

class GeneratorForm extends Component {
	constructor(){
		super(); 
	}

	componentDidMount(){
		var _this = this;
	}
	
	componentDidUpdate(){
		Prism.highlightAll(false)
		if(this.addForm){
			let k = this.state.form.length - 1;
			var dom = ReactDOM.findDOMNode(this.refs["form_param_"+k])	
			dom.focus();
			this.addForm = false;
		}
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
					var params = { 
						moduleId : _this.props.targetProps.moduleId,
					}
					//设置各种状态
					_this.addInput = true;
					if(_this.fetch){
						params.fetch = true; 
					}
					var flag = !!(_this.props.data && _this.props.data.type == "toSave"); 
					if(flag){
						params.type = "save";
					}
					if(_this.form){
						params.form = [ ]
						_this.state.form && _this.state.form.forEach(function(v,k){
							var dom = ReactDOM.findDOMNode(_this.refs["form_param_"+k])	
							if(dom.value != ''){
								params.form.push(dom.value)
							}
						})
					}
					_this.props.form.validateFields((errors, values) => {
						if (!!errors) {
							console.debug('Errors in form!!!');
							return;
						}
						_this.props.dispatch(actionCreator.fetchData(params))
					});
				}
			},
			handleModuleIdChange(){
				return function(e){
					_this.props.dispatch(actionCreator.inputModuleId(e.target.value));
				}
			},
			handleFormChange(){
				return function(e){
					//console.debug(e.target.checked)
					if(e.target.checked){
						_this.form = true;
						_this.setState({
							form : [1], 
						})
						_this.addForm = true;
					}else{
						_this.form = false;
						_this.setState({
							form : null, 
						})
					}
				}
			},
			handleFetchChange(){
				return function(e){
					if(e.target.checked){
						_this.fetch = true;
					}else{
						_this.fetch = null;
					}
					_this.setState({

					})
				}
			},
			handleAddClick(){
				return function(e){
					var form = [];
					var s_form = _this.state.form;
					form.push(2)
					if(s_form){
						form = form.concat(s_form); 
					}
					//console.debug(form)
					_this.setState({
						form : form, 
					})
					_this.addForm = true;
				}
			},
			resetForm(){
				return function(){
					_this.fetch = false;
					_this.form = false;
					_this.addInput = false;
					_this.setState({
						form : null,
					})
				}
			}
		}
	}

    render() {
		super.render();
		var _this = this;
		let { targetProps,data } = this.props;
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 18 },
		};
		let { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
		let emailProps = getFieldProps('module_id', {
			validate: [
				{
					rules: [
						{ required: true,message:"请输入信息~" },
					],
					trigger: 'onBlur',
				},
			]
		});
		let submit_text = "预览"
		data && data.type == "toSave" && (submit_text  = "保存");
		return (
			<Antd.Form horizontal onSubmit={this.handleSubmit()} form={this.props.form} className="clearfix">
				<Antd.Form.Item label="构建选项：" {...formItemLayout}>
					<Antd.Checkbox checked={_this.form} onChange={this.handleFormChange()}/>
					<span className="vm checkbox_text">Form</span>
					<Antd.Checkbox checked={_this.fetch} onChange={this.handleFetchChange()}/>
					<span className="vm checkbox_text">Fetch</span>
				</Antd.Form.Item>
				<Antd.Form.Item {...formItemLayout} label="模块ID：" hasFeedback>
					<Antd.Input {...emailProps} name="module_id" type="text"  onChange={ this.handleModuleIdChange() }
						placeholder="请输入模块ID" value={targetProps.moduleId}/>
				</Antd.Form.Item>
				{
					this.state.form && 
					<div className="ant-form-item item_form">
						<label className="col-3">表单ID：</label>
						<div className="col-18">
							<div className="ant-form-item-control ">
								{
									this.state.form.map(function(v,k){
										return(
											<input key={ k } className="ant-input ant-input-lg" ref={"form_param_"+k} placeholder="请输入表单ID" />
										)
									}) 
								}
								<Antd.Button className="fr btn-submit" onClick={ _this.handleAddClick() }>继续添加</Antd.Button>
							</div>
						</div>
					</div>
				}
				
				{
					_this.addInput && data && data.msg && 
					<div className="ant-form-item item_form">
						<label className="col-3">生成预览：</label>
						<div className="col-18">
							<div className="ant-form-item-control ">
								{ 
									data && data.msg &&
									<div className="state_confirm">
										<Antd.Collapse>
											{
												data.msg.map(function(v,k){
													var m = v.path.match(/\..*/);
													var info = '';
													if(data.type == "saved"){
														info = " 保存成功！"
													}
													var path = v.path.replace(v.id,'').replace(/\..*/,'')
													
													var text = <span>
														{ path }<span className="color_blue">{v.id+m[0]}</span>
														{ info }
													</span>;
													return (
														<Antd.Collapse.Panel header={text} key={v.id}>
															<pre>
																<code className="language-js">
																	{ v.content }
																</code>
															</pre>
														</Antd.Collapse.Panel>
													)
												})
											}
										</Antd.Collapse>
									</div>
								}
							</div>
						</div>
					</div>
					
				}
				<Antd.Form.Item label="&nbsp;" {...formItemLayout}>
					<Antd.Button className="fr btn-submit" type="primary" htmlType="submit">
						{submit_text}
					</Antd.Button>
					<Antd.Button onClick={ _this.resetForm() }  className="fr mr5">
						重新输入	
					</Antd.Button>
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
	    targetProps : state.generatorForm
	};
}
GeneratorForm = Antd.Form.create()(GeneratorForm); 
module.exports = connect(mapStateToProps)(GeneratorForm)
