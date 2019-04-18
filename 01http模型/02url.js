//1.引入http模块
var http=require('http');

var url=require('url');
//2.用http模块创建服务
/*
 req获取信息(request)
 res浏览器返回响应信息(response)
 */

//发送HTTP头部
//HTTP状态值：200：OK
//设置HTTP头部，状态码是200，文件类型是html,字符集是utf-8
http.createServer(function (req,res) {
//http://localhost:8001/news?aid=123 拿到aid
   // req.url获取浏览器url的信息


    res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});

    if(req.url!='/favicon.ico'){
        //http://localhost:8002/news?aid=123
        console.log(req.url);//返回/news?aid=123
        var result = url.parse(req.url,true);//第一个参数是地址，第二个参数是true表示把get传值转换成对象
        console.log('aid='+result.query.aid);//获取url的get传值
        console.log('cid='+result.query.cid);
    }
    res.write("你好 world \n");
    res.end("这是结束语句");
}).listen(8002);

