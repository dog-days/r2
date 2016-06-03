import React from 'react'
import Component from 'libs/react-libs/Component'
import Tips from 'libs/react-libs/Tips'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu,Icon } from 'antd'
import { Row,Col } from 'antd'
import * as fn from 'function'
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

class App_mangager_layout extends Component {
	constructor(){
		super(); 
	}
	
	componentDidMount(){

	}

	setTitle(){
		return "羚羊云第三方管理后台"
	}
	
    handleClick(e) {
        //console.debug('click ', e);
		switch(e.key){
			case 'fullScreen':
				fn.fullScreen(document.getElementById('contents'))
				break;
		}
    }

    render() {
		const { current, theme } = this.props;
		//console.log("Layout",this.props);
        return (
        	<Row className="flex_con">
	        	<Row className="flex_nav" type="flex" justify="start">
					<Menu onClick={this.handleClick} selectedKeys={[current]} theme="light" mode="horizontal">
						<MenuItem key="logo" className="title_logo">
							<Link className="logo fl" to="/"></Link>
						</MenuItem>
					</Menu>
	        	</Row>
				<Row className="flex_content" type="flex" justify="start">
					<Col className="sidebar-left">
						<Menu theme="light">
							<MenuItem>
								<Link to="/acount_info">账号信息</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/operation_log">操作日志</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/app_manager">APP管理</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/app_manager_add">新增APP</Link>
							</MenuItem>
						</Menu>
							
					</Col>	
					<Col className="contents" id="contents">
					{ this.props.contents || "" }
					</Col>
				</Row>
			</Row>
        )

    }
}

function mapStateToProps(state){
	return {
		current : 'mail',
		theme : 'dark'
	};
}
module.exports =  connect(mapStateToProps)(App_mangager_layout)