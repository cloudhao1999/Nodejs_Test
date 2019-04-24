

var express=require('express');
var app=new express();//实例化

app.get('/',function (req,res) {
    res.send('你好express');
})
app.get('/news',function (req,res) {
    res.send('news模块');
})
app.get('/login',function (req,res) {
    res.send('登录模块');
})
app.get('/register',function (req,res) {
    res.send('注册模块');
})
//post
// app.post('/dologin',function (req,res) {
//     res.send('注册模块');
// })
//动态路由
app.get('/newscontent/:aid',function (req,res) {
    //获取动态路由的传值

    console.log(req.params);
    var aid=req.params.aid;
    res.send('newscontent模块--'+aid);
})
//获取get传值http://127.0.0.1:3000/product?aid=123&cid=222
app.get('/product',function (req,res) {
//req.query获取get传值
    console.log(req.query);
    res.send('product'+req.query.aid+'--'+req.query.cid);
})

app.listen(3000,'127.0.0.1');