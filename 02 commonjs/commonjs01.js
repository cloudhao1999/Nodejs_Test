var http=require('http');
var config=require('./config.js')

var app=http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
    res.write('你好nodejs');
    console.log(config);
    res.end();
})
app.listen(8003,'172.16.80.1');