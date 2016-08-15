'use strict';
//require('babel-core/register');

var commander = require('commander')
//各种view名称，src/page/.viewModel文件夹中可以查看
commander
  .version('0.0.1')
  .option('-e, --emptyPage <view-name>', '创建emptyPage视图模板')
  .option('-n, --noactionreducer <view-name>', '创建noactionreducer视图模板')
  .option('-t, --tableNoPagination <view-name>', '创建tableNoPagination视图模板')
  .option('-p, --tableWithPagination <view-name>', '创建tableWithPagination视图模板')
  .parse(process.argv);
  console.log(commander)
