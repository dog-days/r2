import React from 'react'
import { Link }from 'react-router'
require('./style.css')

class NoPage extends React.Component {

	constructor(props){
		super(props); 
		console.debug(props)
	}

	goBack(){
		return ()=>{
			this.props.history.goBack();
		}
	}

    render() {
		return (
			<section className="center nopage-con">
			    <article>
			        <h1 className="header">404</h1>
			        <p className="error">ERROR</p>
			    </article>
				<article>
			        <ul>
						<li><Link to="/">返回主页</Link></li>
						<li><a href="javascript:void(0)" onClick={ this.goBack() }>返回</a></li>
			        </ul>
			    </article>
			</section>
		)	
    }
}
module.exports = NoPage; 
