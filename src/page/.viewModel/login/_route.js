var view = `${r2Common.prefixUrl}/login`;
module.exports = {
    path: `${view}`,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"login")
    }
}

