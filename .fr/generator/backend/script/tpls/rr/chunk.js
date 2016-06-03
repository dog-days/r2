<!--chunk_begin-->
module.exports = {
    path: '${dirname}',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('page/view/${dirname}'))
        },"${dirname}")
    }
}
<!--chunk_end-->
