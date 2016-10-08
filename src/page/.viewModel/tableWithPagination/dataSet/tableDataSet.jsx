import React from 'react'
import * as Antd from 'antd'
var _this;
var originData;
export function getCurrentComponent(target){
  _this = target;
};
var render = (text, row, index) => {
  
}
export let columns = [
  
  {
    title: 'actor_id',
    dataIndex: 'actor_id',
  },
  
  {
    title: 'first_name',
    dataIndex: 'first_name',
  },
  
  {
    title: 'last_name',
    dataIndex: 'last_name',
  },
  
  {
    title: 'last_update',
    dataIndex: 'last_update',
  },
  
  //{
  //title: '操作',
  //dataIndex: '_action_',
  //key: '_action_',
  //render: function(data,columsData){
    //return (
    //<div>
      //<Antd.Icon type="eye" className="mr10 cp" onClick={
      //_this.viewDetail
      //}/>
      //<Antd.Icon type="edit" className="mr10 cp" onClick={
      //_this.edit
      //}/>
      //<Antd.Icon type="delete" className="mr10 cp" onClick={
      //_this.delete
      //}/>
    //</div>  
    //)
  //}
  //},
];

export function dataAdapter(data){
  originData = data;
  let re = [];
  re = r2fn.antdTabelFieldBind(data,columns,function(d,key){
  })
  return re;
}
