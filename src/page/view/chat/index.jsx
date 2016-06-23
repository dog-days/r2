import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
require("css/chat.css") 

class View extends Component {
	constructor(props){
		super(props); 
	}
	componentDidMount(){
		this.socket = io('http://192.168.88.171:3000');
		this.uid = this.getUid(); 
		this.socket.emit('login', { user_id: 'user'+ this.uid});
		this.socket.on('login',data=>{
			this.setMessage(data,0)
		})
		this.socket.on('logout',data=>{
			//console.debug(data)
			this.setMessage(data,1)
		})
		this.socket.on('message',data=>{
			var type;
			if(data.mid == this.mid){
				type = 3;
			}else{
				type = 2;
			}
			this.setMessage(data,type)
		})
	}
	componentDidUpdate(){
		var msgObj = document.getElementById("message")
		//console.debug(msgObj.clientHeight)
		window.scrollTo(0, msgObj.clientHeight);
	}
	componentWillUnmount(){
		this.socket.close();
	}
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		return {
			getUid(){
				return new Date().getTime()+""+Math.floor(Math.random()*899+100);
			},
			setMessage(data,type){
				var messages = [];
				if(this.state.messages){
					messages = this.state.messages;
				}
				messages.push({
					type: type,
					uid: data.uid,
					message: data.message
				})
				this.setState({
					users: data.users,
					messages: messages,
				})
			},
			getMid(){
				return new Date().getTime()+""+Math.floor(Math.random()*899+100);
			},
			tranformUserObjToArray(data){
				var arr = [];
				for(var i in data){
					arr.push(data[i]);
				}
				return arr;
			}
		}
	}
	/**
	 *	事件处理
	 */
	events(){
		var _this = this;
		return{
			handleSubmit(){
				return (e)=>{
					e.preventDefault();
					var content = this.state.content;
					//console.debug(this.props.formInput.content)
					this.mid = this.getMid();
					this.socket.emit('message', { message: content,mid:this.mid });
					this.setState({
						content: '',
					})
				}
			}
		}
	}
    render() {
		super.render();
		let { targetProps } = this.props;
		var contents = <button className="send-btn">发送</button>
		if(this.state.users){
			var users = this.tranformUserObjToArray(this.state.users);
		}
		return (
			<div className="chat" id="message">
				<div>
					当前
					{
						users && users.length || 0
					}
					在线人数
				</div>
				<div>
					{
						this.state.messages && this.state.messages.map((v,key)=>{
							return (
								<div key={ key } className="clearfix">
									{
										v.type == 0 &&
										<div className="login">{ v.uid + "加入聊天室" }</div>
									}
									{
										v.type == 1 &&
										<div className="logout">{ v.uid + "退出聊天室" }</div>
									}
									{
										v.type == 2 &&
										<section className="message">
											<span>{ v.uid }</span>
											<div>{ v.message }</div>
										</section>
									}
									{
										v.type == 3 &&
										<section className="message my-message">
											<span>{ v.uid }</span>
											<div>{ v.message }</div>
										</section>
									}
								</div>
							)
						})
					}
				</div>
				<Antd.Form className="chat-form" horizontal onSubmit={this.handleSubmit()}>
					<Antd.Form.Item>
						<Antd.Input addonAfter={contents} placeholder="请输入聊天内容" { ...this.handleInputState("content") }/>
					</Antd.Form.Item>
				</Antd.Form>
			</div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	    targetProps : state.get("chat"),
	    formInput : state.get("formInput"),
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: "多人聊天室",
	breadcrumb:[
		{
			label:'多人聊天室',
		},
	],
});
module.exports = ReduxView; 
