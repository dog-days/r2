import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'

import CreatorForm from './components/Form'
require('./../../style/css/prism.css')


class View extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(actionCreator.getSecondParentModule())
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
			<div className="creator">
				<CreatorForm />
			</div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	    targetProps : state.get('creator'),
	};
})(View)
ReduxView.defaultProps = Object.assign(Component.defaultProps,{
	title: "模块构造器",
	layout:"frontend/view/layout/main",
});
module.exports = ReduxView; 
