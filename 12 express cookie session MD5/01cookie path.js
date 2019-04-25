
//让用户看不到cookie明文信息
//1.保存的时候加密
//2.用cookie-parser的signed属性设置成true

//cookie加密
//1.参数表示加密的随机字符串
//app.use(cookieParser('sign'));
//2.设置
//res.cookie('userinfo','cookie333',{maxAge:600000,signed:true});
//3.使用
//req.signedCookies
var express=require('express');
var cookieParser=require('cookie-parser');

var app=express();
app.use(cookieParser('sign'));
app.get('/',function (req,res) {
    // console.log(req.cookies);
    console.log(req.signedCookies);//获取加密的cookie信息
    res.send('你好');
})
app.get('/news',function (req,res) {
    console.log(req.cookies);
    res.send('你好news');
})
//baidu.com 域名
//news.baidu.com 二级域名
//多个二级域名共享cookie
app.get('/set',function (req,res) {
    //参数一表示名字，二表示cookie的值，三表示配置信息，maxAge过期时间
    //path表示在哪个路由下面可以访问cookie
    //httpOnly:true表示只在后端调用cookies
    res.cookie('userinfo','cookie333',{maxAge:600000,signed:true});
    res.send('设置cookie成功');
})
app.listen(3000,'127.0.0.1');