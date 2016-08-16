'use strict';
import path from 'path'
import util from 'util'
import Db from '../libs/SqliteDb'

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
}

module.exports = async function(ctx, next){
	var params = ctx.query;
	var size = params.size;
	var page = params.page;
	if(!size) size = 10;
	if(!page) page = 1;
	if(page <= 0 || isNaN(page)){
		ctx.body = {
			message: "page请求参数有问题",
			data: {},
		}
		ctx.status = 400;
		return;
	}
	var db = new Db().connect({ 
		db_path: path.resolve(".end/config/data","module.sqlite3") , 
	})
	var limit = ()=>{
		return `limit ${size * (page-1)},${ size }`
	}
	var data = await execute(db.db,"select * from actor ORDER BY actor_id desc "+limit())	
	var total = await execute(db.db,"select count(*) from actor")	
	ctx.body = {
		message: "请求成功",
		data: {
			total: total[0]["count(*)"],
			current: parseInt(page),
			entries: data,
		},
	};
}
