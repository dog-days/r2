'use strict';
/**
 * Module dependencies.
 */

var middlewares = require('koa-middlewares');
var routes = require('./routes');
var config = require('./config');
var path = require('path');
var http = require('http');
var koa = require('koa');
var cors = require('koa-cors');

var app = koa();
var options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "credentials": true,
  "preflightContinue": false 
};
app.use(cors(options));
/**
 * ignore favicon
 */
app.use(middlewares.favicon());

/**
 * response time header
 */
app.use(middlewares.rt());

/**
 * static file server
 */
app.use(middlewares.staticCache(path.join(__dirname, 'public'), {
    buffer: !config.debug,
    maxAge: config.debug ? 0 : 60 * 60 * 24 * 7
}));
app.use(middlewares.bodyParser());

if (config.debug && process.env.NODE_ENV !== 'test') {
    app.use(middlewares.logger());
}

/**
 * router
 */
app.use(middlewares.router(app));
routes(app);
app = module.exports = http.createServer(app.callback());
app.listen(config.port);
console.log('$ open http://127.0.0.1:' + config.port);
