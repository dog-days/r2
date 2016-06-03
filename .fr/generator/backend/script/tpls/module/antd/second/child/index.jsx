import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
<!--index_import_begin-->
import ${import_var} from '${import_libs}'
<!--index_import_end-->


class View extends Component {
	constructor(props){
		super(props); 
	}
	componentDidMount(){
		var _this = this;
		// this.props.dispatch(actionCreator.fetchData({
		// 	page: 1,
		// }))
	}
	componentWillUnmount(){
	}
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		var obj = {
			list: require('./dataSet/tableDataSet'),
		}
		return obj; 
	}
	/**
	 *	事件处理
	 */
	events(){
		var _this = this;
		return{
			handlePagination(){
				return (page)=>{
					var params = { 
						page:page,
					}
					// this.props.dispatch(actionCreator.addActiviy(params))
				}
			}
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		let targetData,listData;
		if(targetProps.main && targetProps.main.result){
			targetData = targetProps.main;
			this.list.getCurrentComponent(this)
			listData = this.list.dataAdapter(targetProps.main.result.data.data)//针对不同数据要改动
		}
		return (
			<div className="${moduleId}">
				${components}
				{
					targetProps.main && targetProps.main.isFetching &&
					<Antd.Spin className="mt15" size="large"/>
				}
				{
					targetData &&  
					<Antd.Table className="mt15" columns={this.list.columns} dataSource={listData} 
						size="middle" bordered pagination={ false }/>	
				}
				{
					targetData && targetData.result.data.total >= 2 * actionCreator.size && 
					<Antd.Pagination onChange={ this.handlePagination() } className="mt15" total={targetData.result.data.total}
						defaultCurrent={ targetData.result.data.current } defaultPageSize={ actionCreator.size }/>
				}
			</div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	    targetProps : state.${moduleId},
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: "R2框架-页面标题设置处",
	breadcrumb:[
		{
			label:'${moduleId}',
		},
	],
});
module.exports = ReduxView; 
