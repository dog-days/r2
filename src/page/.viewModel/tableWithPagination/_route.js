var view = `${r2Common.prefixUrl}/tableWithPagination`;
module.exports = {
    path: `${view}`,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"tableWithPagination")
    }
}

