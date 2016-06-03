import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class App extends React.Component {

	constructor(props){
		super(props); 
	}

    render() {
		let layout;
		//console.debug(this.props.children)
		if(this.props.children.props.children){
			layout = this.props.children.props.children.props.layout;
		}else{
			layout = this.props.children.props.layout;
		}
		if(layout){
			let LayoutView;
			//console.debug(layout)
			switch(layout){
				case "frontend/view/layout/main":
					if(module.hot){
						LayoutView = require('frontend/view/layout/main');
					}
				break;
				default:
					LayoutView = require('page/layout');
			}

			return (
				<div className = "layout_page_container"> 
					<LayoutView contents={this.props.children || "" } />
				</div>	
			);
		}else{
			return (
				<div style={ { height: "100%", } }> 
					{ this.props.children }
				</div>	
			);
		}
    }
}
export default App

