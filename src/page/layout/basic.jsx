import React from 'react'
import LayoutComponent from 'r2/module/LayoutAntdComponent'
import { push,goBack } from 'react-router-redux'
import cookie from 'cookie_js'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu,Icon,Popover } from 'antd'
import { Row,Col } from 'antd'
import * as Antd  from 'antd'
import * as fn from 'function'
import * as actionCreatorAcount from '../view/acount_info/action'
import * as actionCreatorLogin from '../view/login/action'
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

window.cookie = cookie.all();
class Layout extends LayoutComponent {
	constructor(props){
		super(props); 
		this.state.current = "";
	}
	
	componentDidMount(){
		if(window.cookie && !window.cookie.userid){
			this.props.dispatch(push('/login'))
		}
	}

	componentDidUpdate(){
		if(window.cookie && !window.cookie.userid){
			this.props.dispatch(push('/login'))
		}
	}

	setCookieInfo(){
		let { targetProps,login,applist } = this.props;
		
		//console.debug(applist)
		if(applist.posts && applist.posts.data.apps){
			let apps = applist.posts.data.apps;
			var appids = [];
			var appcodes = [];
			apps.forEach(v=>{
				appids.push(encodeURI(v.app_id));
				appcodes.push(encodeURI(v.code));
			})
			cookie.set({
				appCodes: appcodes,
				appIds: appids,
			},{
				expires: 7,
				path: "/"
			});
		}
		//console.debug(applist)
	}
	
	logout(){
		var _this = this;
		//this.props.dispatch(actionCreatorAcount.clearData())
		var hide = Antd.message.loading("注销中...",0)
		this.props.dispatch(actionCreatorLogin.logout((json)=>{
			hide();	
		},(json)=>{
			cookie.empty()
			cookie.remove('useremail', 'userid','appCodes','appIds');
			setTimeout(()=>{
				//this.props.dispatch(actionCreatorAcount.clearData())
				Antd.message.success("成功注销！");
				this.props.dispatch(push('/login'))
			},100)
		}))
	}

	getCookieInfo(){
		window.cookie = cookie.all();
		if(window.cookie.appCodes){
			this.appCodes = window.cookie.appCodes.split(',');
			this.appIds = window.cookie.appIds.split(',');
		}else{
			this.appIds = [];
			this.appCodes = [];
		}
	}
	
    handleClick(e) {
		this.current = e.key;
		//console.debug(this.current)
    }

	handleSwitchApp(appCode,appId){
		return ()=>{
			var userid = window.cookie.userid;
			localStorage['appId'+userid] = decodeURI(appId); 
			localStorage['appCode'+userid] = decodeURI(appCode); 
		}
	}

	renderWithParams(flag){
		let _this = this;
		let { targetProps,dispatch } = this.props;
		this.setCookieInfo();
		this.getCookieInfo();
		if(window.cookie && !window.cookie.userid){
			return <span></span>
		}
		var userid = window.cookie.userid;
		if(!localStorage['appCode'+userid]){
			if(this.appIds[0]){
				localStorage['appId'+userid] = decodeURI(this.appIds[0]); 
				localStorage['appCode'+userid] = decodeURI(this.appCodes[0]); 
			}
		}
		var params_app = localStorage['appId'+userid];
		var params = r2fn.getUrlParams(location.href)
		this.current = params[1];

		return (
			<Antd.QueueAnim delay={50} style={ { height: "100%", } }>
        	<Row className="flex_con" key="flex_con">
	        	<Row className="flex_nav" type="flex" justify="start">
					<Menu selectedKeys={[]} theme="light" mode="horizontal">
						<MenuItem key="logo" className="title_logo">
							<Link className="logo fl" to="/"></Link>
						</MenuItem>
						{
							localStorage['appId'+userid] ? 
							(
								<SubMenu 
									title={<Link to={"/app_info/detail/"+localStorage['appId'+userid]}>{localStorage['appCode'+userid]}</Link>} 
									className="app-code-menu">
									<ul >
										{
											this.appCodes.map((v,k)=>{
												//console.debug(v)
												return (
													<li key={"app"+k} onClick={ this.handleSwitchApp(v,this.appIds[k])  }>
														<Link className="text-overflow" to={"/app_info/detail/"+this.appIds[k]}>{decodeURI(v)}</Link>
													</li>
												)
											})
										}
										<li key={"addapp"} >
											<Link to="/addApp">
												<Antd.Button size="small">
													<Icon type="plus" className="mr5"/>添加APP
												</Antd.Button>
											</Link>
										</li>
									</ul>
								</SubMenu>
							) : <MenuItem style={ { display: "none", } }></MenuItem>
						}
						{
							!localStorage['appId'+userid] ? 
							(	<MenuItem key="add">
									<Link to="/addApp">
										添加APP
									</Link>
								</MenuItem> 
							) : <MenuItem style={ { display: "none", } }></MenuItem>
						}
						<MenuItem key="2" className="user-info">
							<Popover  overlay={
									<ul className="logout-popver">
										<li>
											<Link to="/acount_info"><Icon type="user" /> 账号信息</Link>
										</li>
										<li onClick={ _this.logout.bind(this) }>
											<a><Icon type="logout" /> 注销</a>	
										</li>
									</ul>
								} title={""}>
								<a className="">{ window.cookie.useremail }</a>
							</Popover>
						</MenuItem>
					</Menu>
	        	</Row>
				<Row className="flex_content" type="flex" justify="start">
					{
						flag &&
						<Col className="sidebar-left">
							<Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.current]}> 
								<MenuItem key="app_manager_edit">
									<Link to={"/app_manager/app_manager_edit/"+params_app} >循环录像剪辑</Link> 
								</MenuItem>
								<MenuItem key="app_manager_id">
									<Link to={"/app_manager/app_manager_id/"+params_app}>ID段管理</Link> 
								</MenuItem>
								<MenuItem key="app_manager_set">
									<Link to={"/app_manager/app_manager_set/"+params_app} >设置管理</Link>
								</MenuItem>
								<MenuItem key="app_manager_equipment">
									<Link to={"/app_manager/app_manager_equipment/"+params_app} >设备列表</Link>
								</MenuItem>
								<MenuItem key="loopclip">
									<Link to={"/storage/loopclip/"+params_app} >循环存储</Link>
								</MenuItem>
								<MenuItem key="app_manager_statistics_query">
									<Link to={"/app_manager/app_manager_statistics_query/"+params_app} >数据统计</Link>
								</MenuItem>
								<MenuItem key="origin">
									<Link to={"/clipsvideo/origin/"+params_app} >事件录像剪辑</Link> 
								</MenuItem>
								<MenuItem key="activityadd">
									<Link to={"/broadcast/activityadd/"+params_app} >活动导播</Link> 
								</MenuItem>
							</Menu>
						</Col>	
					}
					{
						false &&
						<Col className="sidebar-left">
							<Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.current]} 
								defaultOpenKeys={['sub_app']} theme="light" mode="inline">
								<MenuItem key="acount_info">
									<Link to="/acount_info"><Icon type="user" /> 账号信息</Link>
								</MenuItem>
								<MenuItem key="editinfo">
									<Link to="/editinfo"><Icon type="edit" /> 编辑账号</Link>
								</MenuItem>
								<MenuItem key="apps">
									<Link to="/app_manager"><Icon type="android" /> APP管理</Link>
								</MenuItem>
								
								<MenuItem>
									<Link to="/addapp"><Icon type="plus" /> 新增APP</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/operation_log"><Icon type="export" /> 操作日志</Link>
								</MenuItem>
							</Menu>
						</Col>	
					}
					<Col className="contents" id="contents">
						{ this.breadcrumb || "" }
						{ this.props.contents || "" }
					</Col>
				</Row>
			</Row>
			</Antd.QueueAnim>
        )

	}

    render() {
		super.render();
    }
}

module.exports = Layout; 
