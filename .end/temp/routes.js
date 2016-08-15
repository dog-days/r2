import App from 'page/App'
var childRoutes = [
	
	require('src/page/view/about/_route.js'),
	
	require('src/page/view/login/_route.js'),
	
	require('src/page/.viewModel/emptyPage/_route.js'),
	
	require('src/page/.viewModel/noactionrecucer/_route.js'),
	
	require('src/page/.viewModel/tableNoPagination/_route.js'),
	
	require('src/page/.viewModel/tableWithPagination/_route.js'),
	
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
	
	indexRoute: require('src/page/view/index/_route.js'),
	
    component: App,
    childRoutes: childRoutes 
}
