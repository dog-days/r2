import React from 'react'
import { Link }from 'react-router'
import BasicComponent from './BasicComponent'
import ReactDOM from 'react-dom'
import * as Antd from 'antd'
var Breadcrumb = Antd.Breadcrumb; 
/**
 *	layout页面最好继承这个类，做了面包屑处理
 *@prop {Object} homlink 面包写主页设置 
 */
class LayoutAntdComponent extends BasicComponent {
	
	constructor(props){
		super(props); 
	}
	
	createBreadcrumb(){
		if(this.props.contents){
			var breadcrumb;
			if(this.props.contents.props.children){
				breadcrumb = this.props.contents.props.children.props.breadcrumb
			}else{
				breadcrumb = this.props.contents.props.breadcrumb;
			}
			if(breadcrumb){
				if(this.props.contents){
					var c_props = this.props.contents.props;
					this.getParamsOfId(c_props);
				}
				//console.debug(this.r2Params)
				this.breadcrumb = (
					<Breadcrumb className="breadcrumb">
						<Breadcrumb.Item>
							<Link to={ this.props.homeLink.link }>
								{ this.props.homeLink.label }
							</Link>
						</Breadcrumb.Item>
						{
							breadcrumb &&
							breadcrumb.map((v,k)=>{
								if(v.link){
									var link,label;
									if(Object.prototype.toString.apply(v.link) == "[object Function]"){
										link = v.link(this.r2Params);
									}else{
										link = v.link;
									}
									if(Object.prototype.toString.apply(v.label) == "[object Function]"){
										label = v.label(this.r2Params);
									}else{
										label = v.label;
									}
									return(
										<Breadcrumb.Item key={ k }>
											<Link to={ link }>
												{ label }
											</Link>
										</Breadcrumb.Item>
									)
								}else{
									return(
										<Breadcrumb.Item key={ k }>
											{ v.label }
										</Breadcrumb.Item>
									)
								}
							})
						}

					</Breadcrumb>
				) 
			}else{
				this.breadcrumb = '';
			}

		}
	}

	render(){
		super.render();
		this.createBreadcrumb();
	}
}

LayoutAntdComponent.defaultProps = {
	homeLink: {
		label:<Antd.Icon type="home"/>,
		link:'/',
	},
};

module.exports = LayoutAntdComponent
