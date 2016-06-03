<!--chunk_child_begin-->
module.exports = {
    path: '${child_dirname}/:id',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('page/view/${dirname}'))
        },"${child_dirname}")
    }
}
<!--chunk_child_end-->
