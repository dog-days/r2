import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'


class View extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
		this.props.dispatch(actionCreator.fetchData())	
	}

	componentWillUnmount(){
	}
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		return {
			table: require('./dataSet/tableDataSet')
		}
	}
	/**
	 *	事件处理
	 */
	events(){
		var _this = this;
		return {
			handlePagination(){
				return (page)=>{
					var params = { 
						page,
					}
					this.props.dispatch(actionCreator.fetchData(params))	
				}
			},
		}
	}
    render() {
		super.render();
		let { targetProps } = this.props;
		var targetData,tableData;
		if(targetProps.main && targetProps.main.result && targetProps.main.result.data){
			targetData = targetProps.main.result.data;
			this.table.getCurrentComponent(this,targetProps.main.result.data.data)
			tableData = this.table.dataAdapter(targetProps.main.result.data.data)
		}
		return (
			<div className="model">
				{
					false && targetProps.main && targetProps.main.isFetching &&
					<Antd.Spin className="mt15" size="large"/>
				}
				<Antd.Table className="mt15" columns={this.table.columns} loading={ !targetProps.main || targetProps.main.isFetching }
					dataSource={ tableData } size="middle" bordered pagination={ false }/>	
				{
					tableData && targetData.total >= 2 * actionCreator.size && 
					<Antd.Pagination onChange={ this.handlePagination() } className="mt15" defaultCurrent={targetData.current} 
						defaultPageSize={ actionCreator.size } total={ targetData.total}/>	
				}
			</div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	    targetProps : state.get("model"),
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: "R2框架-页面标题设置处",
	breadcrumb:[
		{
			label:'模板',
		},
	],
});
module.exports = ReduxView; 
