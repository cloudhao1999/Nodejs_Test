//1.引入http模块
var http=require('http');

var router=require('C:\\Users\\i\\WebstormProjects\\nodejs\\07nodejs_getpostejs\\model\\router.js');
//console.log(mimeModel.getMime(fs,EventEmitter,'.css'));//获取文件类型

http.createServer(function (req,res) {
   //router.statics(req,res,"07nodejs_getpostejs/static");
   console.log(req.url);
}).listen(8001);

