import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
import Immutable from 'immutable'


class View extends Component {
  constructor(props){
    super(props); 
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }
  /**
   *  数据处理与适配
   */
  dataAdapter(){
    var _this = this;
    return {
    }
  }
  /**
   *  事件处理
   */
  events(){
    var _this = this;
    return {
    }
  }
  render() {
    super.render();
    let { targetProps } = this.props;
    return (
      <div className="emptyPage-view">
      </div>
    )  
  }
}

var ReduxView = connect((state)=>{
  return {
    targetProps : state.get("emptyPage"),
  };
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
  title: "空白页面模板-R2框架",
  breadcrumb:[
    {
      label:'空白页面模板',
    },
  ],
});
module.exports = ReduxView; 
