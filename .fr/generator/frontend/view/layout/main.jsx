import React from 'react'
import component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
require('frontend/style/css/main.css')

class Layout extends component {
	componentDidMount(){

	}

    render() {
		super.render();
		return(
			<div className="r2g-creator-con">
				<Antd.Menu selectedKeys={["2"]} theme={"dark"} mode="horizontal">
					<Antd.Menu.Item key="1" className="">
						<h2>
							R2框架生成器	
						</h2>
					</Antd.Menu.Item>
					<Antd.Menu.Item key="2" className="">
						<h3>
							模块创建	
						</h3>
					</Antd.Menu.Item>
				</Antd.Menu>
				{ this.props.contents }
			</div>
		)
    }
}

function mapStateToProps(state){
	return {

	}
}
module.exports = connect(mapStateToProps)(Layout)
