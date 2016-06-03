<!--chunk_parent_fronted_begin-->
module.exports = {
    path: 'r2g/${dirname}',
    getComponent(location, cb) {
        require.ensure([], (require) => {
             cb(null, require('frontend/view/${dirname}'))
        },"${dirname}")
    },
    <!--chunk_parent_fronted_index_begin-->
    indexRoute: require('.fr/.temp/chunks/page/${dirname}/index'),
    <!--chunk_parent_fronted_index_end-->
    childRoutes:[
    	<!--chunk_parent_fronted_child_begin-->
    	require('.fr/.temp/chunks/fr/${child_dirname}'),
    	<!--chunk_parent_fronted_child_end-->
    ]
    
}
<!--chunk_parent_fronted_end-->
