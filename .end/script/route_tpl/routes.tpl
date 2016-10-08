import App from 'page/App'
var childRoutes = [
  <!--require_begin-->
  require('${path}'),
  <!--require_end-->
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
  <!--index_begin-->
  indexRoute: require('${path}'),
  <!--index_end-->
  component: App,
  childRoutes: childRoutes 
}
