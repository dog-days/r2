import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class App extends React.Component {

	constructor(props){
		super(props); 
	}

    render() {
		return (
			<div style={ { height: "100%", } }> 
				{ this.props.children }
			</div>	
		);
    }
}
export default App

