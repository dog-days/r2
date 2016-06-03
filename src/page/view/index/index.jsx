import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'

class View extends Component {
	constructor(props){
		super(props); 
	}

    render() {
		super.render();
		return (
			<div>
				Hello Word!
			</div>
		)	
    }
}
var ReduxView = connect((state)=>{
	return {
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: "R2框架",
	layout: 'page/layout/index',
	breadcrumb:[
		{
			label:'home',
			link: '/',
		},
		{
			label:'导播活动列表',
		},
	],
});
module.exports = ReduxView; 
