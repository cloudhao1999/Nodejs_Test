
var sd = require('silly-datetime');

var http=require('http');

var app=http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
    var d=sd.format(new Date(),'YYYY-MM-DD HH:mm');
    res.write('你好nodejs'+d);
    res.end();
})
app.listen(8001,'172.16.80.1');