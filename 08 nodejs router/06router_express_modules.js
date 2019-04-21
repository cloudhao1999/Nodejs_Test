var http=require('http');
var ejs=require('ejs');
var app=require
('C:\\Users\\i\\WebstormProjects\\nodejs\\08 nodejs router\\model\\express-route.js');
http.createServer(app).listen(3000);
//注册login这个路由(方法)
app._get('/',function (req,res) {
    var msg='这是数据库的数据';
    ejs.renderFile('C:\\Users\\i\\WebstormProjects\\nodejs\\08 nodejs router\\views\\index.ejs',{msg:msg},function (err,data) {
        res.send(data);
    });
    res.end('login');
})

app._get('/login',function (req,res) {
    console.log('login');
    ejs.renderFile('C:\\Users\\i\\WebstormProjects\\nodejs\\08 nodejs router\\views\\form.ejs',{},function (err,data) {
        res.send(data);
    });
    res.end('login');
})
app._get('/register',function (req,res) {
    console.log('register');
    res.send('register');
})
//执行登录
app._post('/dologin',function (req,res) {
    console.log(req.body);//获取post传过来的数据
    res.send("<script>alert(\'登录成功\');history.back();</script>");
})


