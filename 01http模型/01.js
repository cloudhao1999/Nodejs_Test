//1.引入http模块
var http=require('http');
//2.用http模块创建服务
/*
 req获取信息(request)
 res浏览器返回响应信息(response)
 */

//发送HTTP头部
//HTTP状态值：200：OK
//设置HTTP头部，状态码是200，文件类型是html,字符集是utf-8
http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
    res.write("你好 world \n");
    res.end("这是结束语句");
}).listen(8001);

