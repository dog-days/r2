'use strict';
require('babel-core/register');

var program = require('commander')
//各种view名称，src/page/.viewModel文件夹中可以查看
program
  .version('0.0.1')
  .option('-s --size <sizes>', 'Pizza size')
  .option('-d --drink [sizes]', 'Drink')
  .parse(process.argv);

console.log(' size: %j', program.size);
console.log(' drink: %j', program.drink);
