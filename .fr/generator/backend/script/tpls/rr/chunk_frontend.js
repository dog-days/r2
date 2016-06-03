<!--chunk_frontend_begin-->
module.exports = {
    path: 'r2g/${dirname}',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('frontend/view/${dirname}'))
        },"${dirname}")
    }
}
<!--chunk_frontend_end-->
