import React from 'react'
import ModuleComponent from 'r2/module/BasicComponent'

class Component extends ModuleComponent {
  constructor(props){
    super(props); 
  }
  
  render() {
    super.render();
    let { data } = this.props;
    var style = { }
    return (
      <ul style={ style }>
        {
          data && data.map((v,k)=>{
            return (
              <li key={ k }>{ v }</li>
            )
          })
        }
      </ul>
    )  
  }
}

module.exports = Component; 

