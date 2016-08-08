import React from 'react'
import LayoutComponent from 'r2/module/LayoutAntdComponent'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu } from 'antd'

require('antd/dist/antd.css')
require('css/main.css')
require('css/layout.css')
require('css/base.scss')

class Layout extends LayoutComponent{
	constructor(props){
		super(props); 
	}
	
    render() {
		super.render();
		return (
			<div className="r2-layout">
				<Menu onClick={this.handleClick} mode="horizontal" theme="dark">
					<Menu.Item key="demo">
						<Link to="/">
							R2框架
						</Link>
					</Menu.Item>
					<Menu.Item key="home">
						<Link to="/">
							主页
						</Link>
					</Menu.Item>
					<Menu.Item key="about">
						<Link to="/about">
							关于	
						</Link>
					</Menu.Item>
					<Menu.Item key="login">
						<Link to="/login">
							登陆
						</Link>
					</Menu.Item>
				</Menu>
				<div className="r2-breadcrumb">
					{ this.breadcrumb || "" }
				</div>
				<div className="r2-contents">
					{ this.props.contents || "" }
				</div>
			</div>
		)
    }
}

function mapStateToProps(state){
	return {
	};
}
Layout = connect(mapStateToProps)(Layout)
Layout.defaultProps = Object.assign({},LayoutComponent.defaultProps,{ 
})
module.exports = Layout; 

