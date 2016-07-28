var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var port = 8888;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,//必须跟webpack.config.js一致
}));

app.use(require('webpack-hot-middleware')(compiler));
//地址重写，所以请求都定位到public/index.html文件
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index_dev.html'));
});
//设置路径不存在(webpack-dev-middleware内存中也不存在)时访问的目录,不可以放在地址重写前，要不要会优先
app.use(express.static(path.join(__dirname, 'public')));
var host = "localhost"
app.listen(port, host, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.info("==> 🌎  Listening on port %s. Open up http://"+host+":%s/ in your browser.", port, port)
});

//new WebpackDevServer(webpack(config), {
//publicPath: config.output.publicPath,//必须跟webpack.config.js一致
//hot: true,
//historyApiFallback: true,
//contentBase : "./public/"
//}).listen(port, 'localhost', function(err, result) {
//if (err){
//console.log(err)
//}else{
//console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
//}
//});
