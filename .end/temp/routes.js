import App from 'page/App'
var childRoutes = [
	
	require('src/page/view/layout/main/_route.js'),
	
	require('src/page/view/login/_route.js'),
	
	{
		path: '*',
		getComponent(location, cb) {
			require.ensure([], function(require){
				cb(null, require('page/nopage'))
			},"nopage")
		}
	},

];
module.exports = {
	path : "/",
	indexRoute: require('src/page/view/layout/main/_route.js'),
    component: App,
    childRoutes: childRoutes 
}
