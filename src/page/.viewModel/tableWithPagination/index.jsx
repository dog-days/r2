import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
import Table from 'common/components/Table'
import Immutable from 'immutable'


class View extends Component {
  constructor(props){
    super(props); 
  }

  componentDidMount(){
    this.getData(1)
  }

  componentWillUnmount(){
  }

  getData(page){
    var params = { 
      page,
    }
    this.props.dispatch(actionCreator.fetchData(params))  
  }
  /**
   *  数据处理与适配
   */
  dataAdapter(){
  var _this = this;
  return {
    table: require('./dataSet/tableDataSet')
  }
  }
  /**
   *  事件处理
   */
  events(){
    var _this = this;
    return {
      handlePagination(){
        return (page)=>{
          var loadingHide = Antd.message.loading("",0)
          this.props.dispatch(actionCreator.fetchPaginationData(page,null,(allJson)=>{
          loadingHide()
          }))
        }
      },
   }
  }
  render() {
    super.render();
    let { targetProps } = this.props;
    var targetObject;
    var targetData,loading = true;
    if(targetProps.getIn && targetProps.getIn(["main","result","data"])){
      targetData = targetProps.getIn(["main","result","data"]);
      loading  = targetProps.getIn(["main","isFetching"]);
    }
    return (
      <div className="tableWithPagination-view">
      <Table 
        dataSet={ this.table } 
        data={ targetData } 
        loading={ loading } 
        handlePagination={ this.handlePagination() }
        />  
      </div>
    )  
  }
}

var ReduxView = connect((state)=>{
  return {
    targetProps : state.get("tableWithPagination"),
  };
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
  title: "Table数据表格页面模板-R2框架",
  breadcrumb:[
    {
      label:'Table数据表格页面模板',
    },
  ],
});
module.exports = ReduxView; 
