'use strict';
import Koa from 'koa' 
import http from 'http' 
import routes_config from './routes'

var port = 3000;
var app = new Koa();
var server = http.createServer(app.callback());
var router = routes_config(app)
app.use(router.routes()).use(router.allowedMethods());
server.listen(port);
console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
