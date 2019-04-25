
var express=require('express');
var app=express();
var session=require('express-session');

//配置中间件
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    // cookie:{secure:true}//secure https这样才能访问cookie
}))
app.get('/',function (req,res) {

    //获取session
    if(req.session.userinfo){//获取
        res.send('你好'+req.session.userinfo+'欢迎回来');
    }else{
        res.send('未登录');
    }

});

app.get('/login',function (req,res) {

    req.session.userinfo="zhangsan111";//设置session
    res.send('登陆成功');
});

app.get('/news',function (req,res) {

    //获取session
    if(req.session.userinfo){//获取
        res.send('你好'+req.session.userinfo+'欢迎回来 news');
    }else{
        res.send('未登录');
    }

});

app.listen(3000);
