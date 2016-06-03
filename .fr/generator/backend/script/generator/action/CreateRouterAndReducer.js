var path = require('path')
var CreateRouterAndReducer = require("../model/RouterAndReducer")
var viewPath = { }
if(process.env.NODE_ENV == "development"){
	viewPath = {
		'pageView': path.resolve("src/page/view"),
		'.frView': path.resolve(".fr/generator/frontend/view"),
	}
}else{
	viewPath = {
		'pageView': path.resolve("src/page/view"),
	}
}
new CreateRouterAndReducer({
	tplPath : path.resolve(".fr/generator/backend/script/tpls/rr"),
	routePath : path.resolve(".fr/.temp"),
	reducerPath : path.resolve(".fr/.temp"),
	viewPath : viewPath,
});

