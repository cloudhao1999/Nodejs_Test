//1.引入http模块
var http=require('http');
//fs模块
var fs=require('fs');
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
    //http://localhost:8001/index.html  /index.html

    var pathname=req.url;
    if(pathname=='/'){
        pathname='/index.html';//默认加载的首页
    }
    if(pathname!='/favicon.ico'){//过滤请求
        console.log(pathname);

        //文件操作获取static下面的index.html
        fs.readFile("05nodejs_static_web/static/"+pathname,function (err,data) {
            if(err){//没有这个文件
                console.log("404");

            }else {//有的话返回这个文件
                res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                res.write(data);
                res.end();
            }

        })
    }

    console.log(pathname);

}).listen(8001);

