var view = `${r2Common.prefixUrl}/noactionreducer`;
module.exports = {
    path: `${view}`,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"noactionreducer")
    }
}

