import React from 'react'
import ModuleComponent from 'r2/module/BasicComponent'
import * as Antd from 'antd'

/**
 *  Table 
 * @prop {Object} dataSet 表格dataSet,每个view中的dataSet的require的文件,请先了解view模块中dataSet的作用 
 * @prop {Object} data api中返回的数据,data.entries是固定的二维数组结果，表格要展示的数据 
 * @prop {Boolean} loading 是否现在加载状态 
 * @prop {String} className 类名 
 * @prop {Function} handlePagination(page) 分页点击切换回调函数 
 */
class Component extends ModuleComponent{
  constructor(props){
    super(props)  
  }

  shouldComponentUpdate(nextProps = {}, nextState = {}){
    //if(this.props.loading !== nextProps.loading){
      //return true;
    //}
    return r2fn.shouldDataUpdate(this.props,nextProps,'data')
  }

  render(){
    let { dataSet,data,loading,handlePagination,...other} = this.props;
    var targetData;
    if(data){
      targetData = data.toJS()
      var dataSource = dataSet.dataAdapter(targetData.entries);
      if(dataSet.getCurrentComponent && parent){
      dataSet.getCurrentComponent(parent,targetData.entries)
      }
    }
    console.debug("table-render",loading)
    return (
      <div { ...other }>
      <Antd.Table className="mt15" columns={dataSet.columns} loading={ loading }
        dataSource={ dataSource } size="middle" bordered pagination={ false }/>  
      {
        dataSource && targetData.total >= 2 * targetData.size && 
        <Antd.Pagination onChange={ handlePagination } className="mt15 fr" 
        defaultCurrent={targetData.current} current={ targetData.current }
        defaultPageSize={ targetData.size } total={ targetData.total}/>  
      }

      </div>
    )  
  }
}
Component.propTypes = {
  dataSet: React.PropTypes.object,
  data: React.PropTypes.object,
  loading: React.PropTypes.bool,
  className: React.PropTypes.string,
  handlePagination: React.PropTypes.func,
}
module.exports = Component; 
