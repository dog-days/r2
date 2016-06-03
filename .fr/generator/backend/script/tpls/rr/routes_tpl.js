import App from 'page/App'
var childRoutes = [
	<!--reducer_reducer_begin-->
	require('.fr/.temp/chunks/${dirname}'),
	<!--reducer_reducer_end-->
	{
		path: '*',
		getComponent(location, cb) {
			require.ensure([], (require) => {
				cb(null, require('page/nopage'))
			},"nopage")
		}
	},

];
module.exports = {
	path : "/",
	<!--reducer_index_begin-->
	indexRoute: require('.fr/.temp/chunks/page/index'),
	<!--reducer_index_end-->
    component: App,
    childRoutes: childRoutes 
}
