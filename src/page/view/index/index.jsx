import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
require('css/index.css')

class View extends Component {
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
		return (
			<div>
				<Antd.Alert message="这是一个主页页面！没有action.js和reducer.js。 " type="info" showIcon closable/>
			</div>
		)	
    }
}
var ReduxView = connect((state)=>{
	return {
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: "主页",
	layout: 'page/layout/index',
	breadcrumb:[
		{
			label:'主页',
		},
	],
});
module.exports = ReduxView; 
