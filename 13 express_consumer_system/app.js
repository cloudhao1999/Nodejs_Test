
var express=require('express');
var ejs=require('ejs');
var app=new express();
var md5=require('md5-node');//md5加密
//保存用户信息
var session=require('express-session');
var DB=require('C:\\Users\\i\\WebstormProjects\\nodejs\\13 express_consumer_system\\modules\\db.js');
//配置中间件，固定格式
app.use(session({
    secret:'keyboard cat',//可以随便写
    // name:'session_id',//表示保存在本地的cookie名字，默认connect.sid
    resave:false,//强制保存session，建议false
    saveUninitialized:true,//强制将未初始化的session存储,建议true
    cookie:{
        maxAge:1000*30*60//过期时间
    },//secure https这样才能访问cookie
    //设置过期时间比如是30分钟，如果用户30分钟内一直访问，最后一次访问结束后的30分钟后再过期
    rolling:true//在每次请求时强行设置cookie,这将重置cookie过期时间

}))


var bodyParser=require('body-parser');
//设置bodyParser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//使用ejs模板引擎
app.set('view engine','ejs');
//配置public目录为我们的静态资源目录
app.use(express.static('13 express_consumer_system/public'));
//ejs中全局数据 所有的页面都可以用
// app.locals['userinfo']='123';
app.use(function (req,res,next) {

    // console.log(req.url);
    if(req.url=='/login'||req.url=='/doLogin'){
        next();
    }else{
        if(req.session.userinfo && req.session.userinfo.username!=''){
            app.locals['userinfo']=req.session.userinfo;//配置全局变量可以在任何模板使用
            next();
        }else{
            res.redirect('/login');
        }
    }
})
// app.locals['userinfo']='1111111';
//自定义中间件 判断登陆状态

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
    //连接数据库查询数据
    //商品列表
    DB.find('product',{},function (err,data) {
        res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13 express_consumer_system\\views\\product.ejs',{list:data});
    })
});

app.get('/productadd',function (req,res) {
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13 express_consumer_system\\views\\productadd.ejs');
});

app.get('/productedit',function (req,res) {
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13 express_consumer_system\\views\\productedit.ejs');
});
//获取登录提交的数据
app.post('/doLogin',function (req,res) {
    //res.send('product');
    // console.log(req.body);//获取post提交的数据
    var username=req.body.username;
    var password=md5(req.body.password);//用户密码加密
//1.获取数据
// 2.链接数据库查询数据
    DB.find('user',{username:username,password:password},function (err,data) {
        if(data.length>0){
            console.log("登陆成功");
            //保存用户信息
            req.session.userinfo=data[0];
            res.redirect('/product');//跳转到商品列表
        }else{

            // console.log("登陆失败");
            res.send("<script>alert('登录失败');location.href='/login'</script>");
        }

    })



});
app.get('/loginOut',function (req,res) {
    //销毁session
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }else{
            res.redirect('/login');
        }
    })
})
app.get('/productdelete',function (req,res) {
    res.send('productdelete');
});
//删除数据
app.get('/delete',function (req,res) {
    DB.deleteOne('product',{"title":"iPhone4"},function (error,data) {
        if(!error){
            res.send('删除数据成功');
        }
    })
})
app.listen(3000,'127.0.0.1');