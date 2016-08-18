var view = `${r2Common.prefixUrl}/emptyPage`;
module.exports = {
    path: `${view}`,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"emptyPage")
    }
}

