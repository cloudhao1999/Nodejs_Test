
var express=require('express');
var ejs=require('ejs');
var app=new express();
//使用ejs模板引擎
app.set('view engine','ejs');
//配置public目录为我们的静态资源目录
app.use(express.static('13 express_consumer_system/public'));
app.get('/',function (req,res) {
    res.send("login");
});
//登录
app.get('/login',function (req,res) {
    //res.send('login');
    //默认找views目录
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13 express_consumer_system\\views\\login.ejs');
});

app.get('/product',function (req,res) {
    //res.send('product');
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13 express_consumer_system\\views\\product.ejs');
});

app.get('/productadd',function (req,res) {
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13 express_consumer_system\\views\\productadd.ejs');
});

app.get('/productedit',function (req,res) {
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13 express_consumer_system\\views\\productedit.ejs');
});

app.get('/productdelete',function (req,res) {
    res.send('productdelete');
});
app.listen(3000,'127.0.0.1');