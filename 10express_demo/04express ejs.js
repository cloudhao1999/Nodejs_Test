//1.安装ejs npm install ejs
//2.express 里面使用ejs 安装以后就可以用，不需要引入
//3.配置express的模板引擎
//app.set("view engine","ejs");
//在express中使用ejs

var express=require('express');
var app=express();
app.set('view engine','ejs');//配置ejs模板引擎
//设置模板的位置
app.set('views',__dirname+'/views');
//中间件app.use
//express.static('public')给public目录下文件提供静态web服务
app.use(express.static('10express_demo/public'));
//配置虚拟目录的静态web服务
//http://127.0.0.1:3001/static/image/baidu.png
app.use('/static',express.static('10express_demo/public'));

app.get('/',function (req,res) {
    // res.send('Index');
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\10express_demo\\views\\index.ejs');//渲染模板
})
app.get('/newslist',function (req,res) {
    // res.send('Index');
    var arr=['111','222','333'];
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\10express_demo\\views\\news.ejs',{list:arr});//渲染模板
})
//端口大于3000
app.listen(3001,'127.0.0.1');