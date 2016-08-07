'use strict';
import koaRouter from 'koa-router'
import index from './controller/index'

module.exports = function routes(app) {
	var router = koaRouter();
	router.get('/',index);
	return router;
}
