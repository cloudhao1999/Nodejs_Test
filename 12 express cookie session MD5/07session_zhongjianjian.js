
var express=require('express');
var app=express();
var session=require('express-session');

//配置中间件
app.use(session({
    secret:'keyboard cat',//可以随便写
    name:'session_id',//表示保存在本地的cookie名字，默认connect.sid
    resave:false,//强制保存session，建议false
    saveUninitialized:true,//强制将未初始化的session存储,建议true
     cookie:{
        maxAge:50000//过期时间
     },//secure https这样才能访问cookie
    //设置过期时间比如是30分钟，如果用户30分钟内一直访问，最后一次访问结束后的30分钟后再过期
    rolling:true//在每次请求时强行设置cookie,这将重置cookie过期时间

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
