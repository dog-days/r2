<!--chunk_child_frontend_begin-->
module.exports = {
    path: '${child_dirname}/id',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('frontend/view/${dirname}'))
        },"${child_dirname}")
    }
}
<!--chunk_child_frontend_end-->
