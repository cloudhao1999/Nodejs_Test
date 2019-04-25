

var express=require('express');
var cookieParser=require('cookie-parser');

var app=express();
app.use(cookieParser());
app.get('/',function (req,res) {
    console.log(req.cookies);
    res.send('你好');
})
app.get('/news',function (req,res) {
    console.log(req.cookies);
    res.send('你好news');
})
app.get('/set',function (req,res) {
    //参数一表示名字，二表示cookie的值，三表示配置信息，maxAge过期时间
    res.cookie('username','cookie值',{maxAge:60000});
    res.send('设置cookie成功');
})
app.listen(3000,'127.0.0.1');