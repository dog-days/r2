import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
<!--index_import_begin-->
import ${import_var} from '${import_libs}'
<!--index_import_end-->

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
		var _this = this;
		let { targetProps } = this.props;
		return (
			<div className="${moduleId}">
				${components}
			</div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	    targetProps : state.${moduleId},
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: "R2框架-页面标题设置处",
	breadcrumb:[
		{
			label:'${moduleId}',
		},
	],
});
module.exports = ReduxView; 
