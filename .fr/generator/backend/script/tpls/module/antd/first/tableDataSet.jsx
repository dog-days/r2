import React from 'react'
import * as Antd from 'antd'
var _this;
var originData;
export function getCurrentComponent(e){
	_this = e;
};
export let columns = [
	<!--table_colums_begin-->
	{
		title: '${columns_id}',
		dataIndex: '${columns_id}',
	},
	<!--table_colums_end-->
	{
		title: '操作',
		dataIndex: '_action_',
		key: '_action_',
		render: function(data,columsData){
			return (
				<div>
					<Antd.Icon type="eye" className="mr10"/>
					<Antd.Icon type="edit" className="mr10"/>
					<Antd.Icon type="delete" className="mr10"/>
				</div>	
			)
		}
	},
];

export function dataAdapter(data){
	originData = data;
	let re = [];
	re = r2fn.antdTabelFieldBind(data,columns,function(d,key){
		
	})
	return re;
}
