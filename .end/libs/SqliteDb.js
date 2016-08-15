'use strict';
var util = require('util');
var path = require('path');
var sqlite3 = require('sqlite3');

class Db{
	constructor(){
		
	}
	/**
	* 链接数据库,数据库不存在就生成
	* @param { Object } config 数据库链接配置信息，{db_path:数据库路径}
	*/
	connect(config){
		this.db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
			(err)=>{
				if (err){
					util.log(`Fail to open database ${ config.db_path }` + err);
					config.callback && config.callback(err);
				} else {
					util.log(`Success to open database ${ config.db_path }`);
					config.callback && config.callback(null);
				}
			}
		);
		return this;
	}

	insertOne(options){
		this.db.run(options.sql,options.params,
			function(err){
				if (error){
					util.log(`Fail to insert` + err);
					options.callback && options.callback(err);
				} else {
					options.callback && options.callback(null);
				}
			}
		);
	}
}

module.exports = Db;

