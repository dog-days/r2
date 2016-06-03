import React from 'react'
import BasicLayout from './basic'
import { connect } from 'react-redux'
import { Menu,Icon,Popover } from 'antd'

class Layout extends BasicLayout{
	constructor(props){
		super(props); 
	}
	
    render() {
		super.render();
		return this.renderWithParams(false)
    }
}

function mapStateToProps(state){
	return {
		targetProps: state.get('acount_info'),
		login: state.get('login'),
	    applist : state.get('addApp'),
	};
}
Layout = connect(mapStateToProps)(Layout)
Layout.defaultProps = {
	homeLink: {
		label:<Icon type="home"/>,
		link:'/',
	},
};
module.exports = Layout; 
