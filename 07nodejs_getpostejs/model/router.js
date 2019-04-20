//fs模块
var fs=require('fs');
//path模块
var path=require('path');//nodejs自带模块

//url模块
var url=require('url');

//引入扩张名的方法是在文件里面获取到的
var events=require('events');

//console.log(events);
//获取文件类型的方法 私有
function getMime(extname,callback) {
    fs.readFile('C:\\Users\\i\\WebstormProjects\\nodejs\\07nodejs_getpostejs\\mime.json',function (err,data) {
        if(err){
            console.log('json文件不存在');
            return false;
        }
        //console.log(data.toString());

        var Mimes=JSON.parse(data.toString());
        // console.log(Mimes[extname]);

        var result= Mimes[extname] || 'text/html';
        callback(result);
    })
}

var EventEmitter=new events.EventEmitter();

exports.statics=function (req,res,staticpath) {
    var pathname=url.parse(req.url).pathname;//获取url值
    if(pathname=='/'){
        pathname='/login.ejs';//默认加载的首页
    }
    //获取文件的后缀名
    var extname=path.extname(pathname);

    if(pathname!='/favicon.ico'){//过滤请求
        console.log(pathname);

        //文件操作获取static下面的index.html
        fs.readFile(staticpath+"/"+pathname,function (err,data) {
            if(err){//没有这个文件
                console.log("404");
                fs.readFile(staticpath+'/404.html',function (error,data404) {
                    if(error){
                        console.log(error);
                    }
                    res.writeHead(404,{"Content-Type":"text/html;charset=utf-8"});
                    res.write(data404);
                    res.end();
                });

            }else {//有的话返回这个文件
                getMime(EventEmitter,function (mime) {
                    res.writeHead(200,{"Content-Type":""+mime+";charset=utf-8"});
                     res.write(data);
                     res.end();
                });//调用获取数据方法

            }

        })
    }


}