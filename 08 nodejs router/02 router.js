//1.引入http模块
var http=require('http');

var url=require('url');

var ejs=require('ejs');

var fs=require('fs');

var model=require('C:\\Users\\i\\WebstormProjects\\nodejs\\08 nodejs router\\model\\model.js');

// model['register']('111','222');
//路由指的是针对不同请求的url,处理不同的业务逻辑。
http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
     var pathname=url.parse(req.url).pathname.replace('/','');
    // console.log(pathname);
    if(pathname!='favicon.ico'){

        try {
            model[pathname](req,res);
        }catch (err) {
            model['home'](req,res);
        }

    }
}).listen(8001);

