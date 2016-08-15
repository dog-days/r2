'use strict';
var path = require('path')
var util = require('util');
var parse = require('co-body');
var Db = require('../script/generator/model/moduleDataProvider.js')

function execute(db,sql){
	return new Promise(function(resolve, reject) {
		db.all(sql,{},(err,row)=>{
			if(!err){
				resolve(row);
			}else{
				reject(err)
			}
		})
	})
	console.log(data)
}

module.exports = function* creator(next) {
	var params = this.query;
	var size = params.size;
	var page = params.page;
	if(!size) size = 10;
	if(!page) page = 1;
	if(page <= 0 || isNaN(page)){
		this.body = {
			message: "page请求参数有问题",
			data: {},
		}
		this.status = 400;
		return;
	}

	var db = new Db().connect({ 
		db_path: path.resolve(".fr/generator/backend/script/generator/model/data","module.sqlite3") , 
	})
	var limit = ()=>{
		return `limit ${size * (page-1)},${ size }`
	}
	var data = yield execute(db.db,"select * from actor ORDER BY actor_id desc "+limit())	
	var total = yield execute(db.db,"select count(*) from actor")	
	this.body = {
		message: "请求成功",
		data: {
			total: total[0]["count(*)"],
			current: parseInt(page),
			entries: data,
		},
	};
	this.status = 200;
};
