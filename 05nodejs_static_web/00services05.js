//1.引入http模块
var http=require('http');
//fs模块
var fs=require('fs');
//path模块
var path=require('path');//nodejs自带模块

//url模块
var url=require('url');

//引入扩张名的方法是在文件里面获取到的

var mimeModel=require('../05nodejs_static_web/model/getmimefromfile.js');
console.log(mimeModel.getMime(fs,'.css'));//获取文件类型


//console.log(path.extname('index.css'));

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

    var pathname=url.parse(req.url).pathname;
    if(pathname=='/'){
        pathname='/index.html';//默认加载的首页
    }
    //获取文件的后缀名
    var extname=path.extname(pathname);

    if(pathname!='/favicon.ico'){//过滤请求
        console.log(pathname);

        //文件操作获取static下面的index.html
        fs.readFile("05nodejs_static_web/static/"+pathname,function (err,data) {
            if(err){//没有这个文件
                console.log("404");
                fs.readFile('05nodejs_static_web/static/404.html',function (error,data404) {
                    res.writeHead(404,{"Content-Type":"text/html;charset=utf-8"});
                    res.write(data404);
                    res.end();
                });

            }else {//有的话返回这个文件
                var mime=mimeModel.getMime(fs,extname);//获取文件类型
                res.writeHead(200,{"Content-Type":""+mime+";charset=utf-8"});
                res.write(data);
                res.end();
            }

        })
    }



}).listen(8001);

