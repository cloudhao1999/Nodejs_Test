
var express=require('express');
var app=express();
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
//配置中间件
app.use(session({
    secret:'keyboard cat',//可以随便写
    name:'session_id',//表示保存在本地的cookie名字，默认connect.sid
    resave:false,//强制保存session，建议false
    saveUninitialized:true,//强制将未初始化的session存储,建议true
     cookie:{
        maxAge:1000*30*60//过期时间
     },//secure https这样才能访问cookie
    //设置过期时间比如是30分钟，如果用户30分钟内一直访问，最后一次访问结束后的30分钟后再过期
    rolling:true,//在每次请求时强行设置cookie,这将重置cookie过期时间
    store:new MongoStore({
        url:'mongodb://127.0.0.1:27017/student',//数据库地址
        touchAfter:24*3600//time period in seconds  24小时更新一次
    })
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

app.get('/logout',function (req,res) {

    // req.session.cookie.maxAge=0;//改变cookie的过期时间
    req.session.destroy(function (err) {
        console.log(err);
    })

    res.send('退出登陆成功');
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
