'use strict';
var path = require('path')
var util = require('util');
var parse = require('co-body');
var Db = require('../script/generator/model/moduleDataProvider.js')

function* find(){

}

module.exports = function* creator(next) {
	var db = new Db().connect({ 
		db_path: path.resolve(".fr/generator/backend/script/generator/model/data","module.sqlite3") , 
	})
	var data;
	console.log(0)
	yield db.find(
		{
			sql: "SELECT * FROM actor",
			params: [],
			callback: (error,row)=>{
			if(!error){
				//util.log(row)
				//util.log(1)
				data = row;
				var msg = data; 
			}
		}
	});
	
	this.body = "d";
	this.status = 200;
};
