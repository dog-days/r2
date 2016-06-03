import React from 'react'
import LayoutComponent from 'r2/module/LayoutAntdComponent'
import { connect } from 'react-redux'
require('../../../style/css/main.css')

class Layout extends LayoutComponent{
	constructor(props){
		super(props); 
	}
	
    render() {
		super.render();
		return (
			<div>
				{ this.breadcrumb || "" }
				{ this.props.contents || "" }
			</div>
		)
    }
}

function mapStateToProps(state){
	return {
	};
}
Layout = connect(mapStateToProps)(Layout)
module.exports = Layout; 

