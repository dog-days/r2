'use strict';
var view = `/sop`;
var childRoutes = function(){
	var re;
	try{
		re = require('./.child_routes.js')
	}catch(e){}	
	return re;
}
module.exports = {
	path: view, 
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"main")
    },
    childRoutes: childRoutes(),
}
