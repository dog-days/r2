import React from 'react'
import ReactDOM from 'react-dom'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'
import Prism from 'prismjs'

class Form extends Component {
	constructor(props){
		super(props); 
		this.isModuleParent = false;
		this.isModuleChild = false;
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(r2ActionCreator.inputAction('creator_fetch_get',"GET"))
	}
	
	componentDidUpdate(){
		if(this.state.visible){
			setTimeout(function(){
				Prism.highlightAll();
			},10)
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
			handlePreview(){
				return (e)=>{
					delete this.saveData;
					e.preventDefault();
					this.props.form.validateFieldsAndScroll((errors, values) => {
						//console.debug(values);
						if (!!errors) {
							console.log('Errors in form!!!');
							return;
						}
						console.log('Submit!!!');
						if(values.creator_module[1] == "1-2"){
							this.isModuleParent = true;
						}
						if(values.creator_module[1] == "1-3"){
							this.isModuleChild = true;
						}
						let targetProps = this.props.formInput; 
						var params = { 
							moduleid : values.moduleid,
							tabledata : targetProps.tabledata,
							module : values.creator_module,
							fetch: {},
							inputs: [],
							child: this.isModuleChild,
						}
						if(this.state.form){
							this.state.form.forEach((v,k)=>{
								var dom = ReactDOM.findDOMNode(this.refs["inputid"+k])	
								//console.debug(dom)
								if(dom.value != '' && dom.value){
									params.inputs.push(dom.value)
								}
							})
						}

						if(targetProps.creator_fetch_get){
							params.fetch.get = targetProps.creator_fetch_get;
						}else{
							params.fetch.get = false;
						}

						if(targetProps.creator_fetch_post){
							params.fetch.post = targetProps.creator_fetch_post;
						}else{
							params.fetch.post = false;
						}

						if(targetProps.creator_fetch_post_form){
							params.fetch.post_form = targetProps.creator_fetch_post_form;
						}else{
							params.fetch.post_form = false;
						}

						if(targetProps.creator_fetch_put){
							params.fetch.put = targetProps.creator_fetch_put;
						}else{
							params.fetch.put = false;
						}

						if(targetProps.creator_fetch_patch){
							params.fetch.patch = targetProps.creator_fetch_patch;
						}else{
							params.fetch.patch = false;
						}

						if(targetProps.creator_fetch_delete){
							params.fetch.delete = targetProps.creator_fetch_delete;
						}else{
							params.fetch.delete = false;
						}
					
						//console.debug(params)
						 _this.props.dispatch(actionCreator.previewModuleContents(params))
					});
					return;
					
				}
			},
			handleTreeSelectChange(){
				return (value)=>{
					console.debug(value)
				}
			},
			handleTabChange(){
				return (value)=>{
					switch(value){
						case "form":
							!this.state.form && this.setState({
								form: [1],
							})
							break;
						default:
					}
				}
			},
			handleInputAdd(){
				return ()=>{
					var num = this.state.form;
					num.push(1);
					this.setState({
						form: num,
					})
				}
			},
			handleInputDelete(){
				return ()=>{
					var num = this.state.form;
					num.shift(1);
					this.setState({
						form: num,
					})
				}
			},
			handleCancel(e) {
				return ()=>{
					this.setState({
						visible: false
					});
				}
			},
			handleSigleFilePreview(data){
				return ()=>{
					this.setState({
						visible: true, 
						previewData: data,
					});
				}
			},
			handleSaveCheck(data){
				if(!this.saveData){
					this.saveData = {};
				}
				return (e)=>{
					if(e.target.checked){
						this.saveData[data.id] = data;
					}else{
						if(this.saveData[data.id]){
							delete this.saveData[data.id]
						}
					}
					//console.debug(this.saveData)
				}
			},
			handleSaveData(previewData){
				return ()=>{
					if(!r2fn.isEmptyObj(this.saveData)){
						var params = {
							data: this.saveData,
							moduleDir: previewData.moduleDir,
							parent: this.isModuleParent,
							child: this.isModuleChild,
						}
						this.props.dispatch(actionCreator.saveModuleContents(params,(json)=>{
							var data = (
								<span>
									{
										json.data.map((v,k)=>{
											return (
												<div key={ k }>{ v.msg }</div>
											)
										})
									}
								</span>
							)
							Antd.message.info(data)
							this.props.dispatch(actionCreator.getSecondParentModule())
						}))
					}else{
						Antd.message.warn("请选择保存的文件！")
					}
				}
			}
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps,formInput } = this.props;
		var mainFetching = false,
			saveFetching = false,
			secondParentModuleData = [],
			previewData,
			saveData; 
		if(targetProps.preview && targetProps.preview.result){
			mainFetching = targetProps.preview.isFetching ;
			previewData = targetProps.preview.result;
		}	
		if(targetProps.save && targetProps.save.result){
			saveFetching = targetProps.preview.isFetching ;
			saveData = targetProps.save.result;
		}	
		//console.debug(previewData)
		if(targetProps.getSecondParentModule && targetProps.getSecondParentModule.result){
			targetProps.getSecondParentModule.result.data.forEach(function(v,k){
				secondParentModuleData.push({
					label: v.name,
					value: v.path,
					title: v.path,
					key: '1-3-'+k,
				})
			})
		}	
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 18 },
		};
		var viewLists = [
			{
				label: "page",
				value: 'page',
				key: '1-1-page',	
			},
			{
				label: ".fr",
				value: '.fr',
				key: '1-1-fr',	
			},
		]
		var treeData = [
			{
				label: "Antd模板",
				value: '1',
				key: '1',
				children:[
					{
						label: "一级模板",
						value: '1-1',
						key: '1-1',	
						children: viewLists,
					},
					{
						label: "二级父模板",
						value: '1-2',
						key: '1-2',	
						children: viewLists,
					},
					{
						label: "二级子模板",
						value: '1-3',
						key: '1-3',	
						children: secondParentModuleData,
					},
				]
			}
		]
		// 只展示最后一项
		function displayRender(label) {
			return label[label.length - 1];
		}

		let emptyInput = require('validate/empty')(this.props.form);
		let cascaderProps = this.props.form.getFieldProps('creator_module', {
			rules: [
				{ required: true, message: '请选择模板!', type: 'array' },
			]
		});

		return (
			<Antd.Form horizontal onSubmit={this.handlePreview()} className="creator-form-con mt15" form={this.props.form}>
				
				<Antd.Form.Item label="模块ID："  {...formItemLayout} >
					<Antd.Input { ...emptyInput("moduleid") } style={{ width: "210px" }} name="moduleid"
							placeholder="请输入模块ID" />
				</Antd.Form.Item>

				<Antd.Form.Item label="模板选择："  {...formItemLayout}>
				    <Antd.Cascader { ...cascaderProps } style={{ width: "210px" }} options={treeData} expandTrigger="hover" 
					    displayRender={displayRender}  /> 
				</Antd.Form.Item>

				<Antd.Form.Item label="构建选项："  {...formItemLayout}>
					<Antd.Tabs type="card" onChange={ this.handleTabChange() }>
						<Antd.Tabs.TabPane tab="Fetch" key="fetch">
							<div className="ml15">
								<Antd.Checkbox defaultChecked={true} 
									{ ...this.handleInputProps('creator_fetch_get') } value="fetch_get" /> GET 
							</div>
							<div className="ml15">
								<Antd.Checkbox defaultChecked={false} 
									{ ...this.handleInputProps('creator_fetch_post') } value="fetch_post"/> POST 
							</div>
							<div className="ml15">
								<Antd.Checkbox defaultChecked={false} 
									{ ...this.handleInputProps('creator_fetch_post_form') } value="fetch_post_form"/> POST-FORM 
							</div>
							<div className="ml15">
								<Antd.Checkbox defaultChecked={false} 
									{ ...this.handleInputProps('creator_fetch_patch') } value="fetch_patch"/> PATCH 
							</div>
							<div className="ml15">
								<Antd.Checkbox defaultChecked={false} 
									{ ...this.handleInputProps('creator_fetch_delete') } value="fetch_delete"/> DELETE 
							</div>
							<div className="ml15">
								<Antd.Checkbox defaultChecked={false} 
									{ ...this.handleInputProps('creator_fetch_put') } value="fetch_put"/> PUT 
							</div>
						</Antd.Tabs.TabPane>
						<Antd.Tabs.TabPane tab="Form" key="form">
							{
								this.state.form && this.state.form.map((v,k)=>{
									return(
										<div className="relative" key={ k }>
											<input className="ant-input ant-input-lg mb10" ref={"inputid"+k} placeholder="请输入表单ID" />
											{
												this.state.form.length > 1 &&
												<Antd.Icon onClick={ this.handleInputDelete() }
													type="minus-circle" className="deleteInput"/>
											}
										</div>
									)
								}) 
							}
							{
								this.state.form &&
								<Antd.Button className="btn-submit fr" onClick={ this.handleInputAdd() }>继续添加</Antd.Button>
							}
						</Antd.Tabs.TabPane>
						<Antd.Tabs.TabPane tab="Table" key="table">
							<Antd.Input style={ { height:"200px", } } type="textarea" name="table-text" placeholder="请输入表格数据" 
									{ ...this.handleInputProps('tabledata') }/>
						</Antd.Tabs.TabPane>
					</Antd.Tabs>
				</Antd.Form.Item>
				
				{
					previewData && 
					<Antd.Form.Item label="生成预览："  {...formItemLayout}>
						<div className="preview-con">
 							{
								previewData.msg.map((v,k)=>{
									if(k == previewData.msg.length-1){
										var className = "preview-h4 preview-h4-last"
									}
									return (
										<h4 key={ k } className={className || "preview-h4"} >
											<a href="javascript:void(0)" onClick={ this.handleSigleFilePreview(v) }>{ v.path }</a>
											<Antd.Checkbox defaultChecked={false} className="fr preview-checkbox" 
												onChange={this.handleSaveCheck(v)} value={v.path}/>  
										</h4>
									)
								})
							}
						</div>
					</Antd.Form.Item>
				}

				<Antd.Form.Item label="&nbsp;"  {...formItemLayout}>
					<Antd.Button loading={mainFetching} className="btn-submit" type="primary" htmlType="submit">预览</Antd.Button>
					{
						previewData &&
							<Antd.Button loading={saveFetching} className="btn-submit ml10" type="primary"
									onClick={ this.handleSaveData(previewData) }>保存</Antd.Button>
					}
				</Antd.Form.Item>
				
				<Antd.Modal title="预览" visible={this.state.visible} footer={ false }
					width="800" onCancel={this.handleCancel()}>
					{
						this.state.visible && 
						<pre className="preview-pre">
							<code className="language-js">
								{this.state.previewData && this.state.previewData.content}
							</code>
						</pre>
					}
				</Antd.Modal>
			</Antd.Form>
		)	
    }
}

var ReduxForm = connect((state)=>{
	return {
	    formInput : state.get('formInput'),
	    targetProps : state.get('creator'),
	};
})(Form)
module.exports = Antd.Form.create()(ReduxForm);



