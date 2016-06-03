<!--chunk_parent_begin-->
module.exports = {
    path: '${dirname}',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('page/view/${dirname}'))
        },"${dirname}")
    },
    <!--chunk_parent_index_begin-->
    indexRoute: require('.fr/.temp/chunks/page/${dirname}/index'),
    <!--chunk_parent_index_end-->
    childRoutes:[
    	<!--chunk_parent_child_begin-->
    	require('.fr/.temp/chunks/page/${dirname}/${child_dirname}'),
    	<!--chunk_parent_child_end-->
    ]
    
}
<!--chunk_parent_end-->