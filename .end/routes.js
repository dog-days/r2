'use strict';
import koaRouter from 'koa-router'
import index from './controller/index'
import model from './controller/model'
import login from './controller/login'

module.exports = function routes(app) {
	var router = koaRouter();
	router.get('/',index);
	router.get('/model',model);
	router.get('/providemoduledata',model);
	router.post('/login',login);
	return router;
}
