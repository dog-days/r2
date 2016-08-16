var view = "tableNoPagination";
module.exports = {
    path: `${view}`,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"tableNoPagination")
    }
}

