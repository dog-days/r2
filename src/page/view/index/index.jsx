import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'


class View extends Component {
  constructor(props){
    super(props); 
  }
  componentDidMount(){
    var _this = this;
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
    return{
    }
  }
  render() {
    super.render();
    var _this = this;
    let { targetProps } = this.props;
    return (
      <div className="about">
        <Antd.Alert message={r2fn.t("这是一个主页页面！")} type="info" showIcon />
      </div>
    )  
  }
}

var ReduxView = connect((state)=>{
  return {
    targetProps : state.about,
  };
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
  title: r2fn.t("主页"),
  breadcrumb:[
    {
      label: r2fn.t("主页"),
    },
  ],
});
module.exports = ReduxView; 
