'use strict';
import koaRouter from 'koa-router'
import index from './controller/index'
import model from './controller/model'

module.exports = function routes(app) {
	var router = koaRouter();
	router.get('/',index);
	router.get('/model',model);
	router.get('/providemoduledata',model);
	return router;
}
