import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux' 

class App extends React.Component {
  constructor(props){
    super(props); 
    //处理r2Common.prefixUrl不为空的首页空白问题
    if(this.props.location.pathname == "/" && r2Common.prefixUrl != ""){
      this.props.dispatch(push(r2Common.prefixUrl))  
    }
  }

  render() {
    return (
      <div style={ { height: "100%", } }> 
      { this.props.children }
      </div>  
    );
  }
}
export default connect((state)=>{
  return {
  };
})(App)
