var ejs=require('ejs');
var fs=require('fs');
var app={
    //login
    login:function (req,res) {
    console.log('login');
    // res.end('login');
        ejs.renderFile('C:\\Users\\i\\WebstormProjects\\nodejs\\08 nodejs router\\views\\form.ejs',{},function (err,data) {
            res.end(data);
        })
    },
    register:function (req,res) {
        console.log('register');
        res.end('register');
    },
    dologin:function (req,res) {
        var postStr='';
        req.on('data',function (chunk) {
            postStr+=chunk;
        })
        req.on('end',function (err,chunk) {
            //res.end(postStr);
            console.log(postStr);
            fs.appendFile('07nodejs_getpostejs/login.txt', postStr + '\n', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("写入数据成功");
                }
            })
            res.end("<script>alert('登录成功');history.back();</script>");
        })
    },
    home:function (req,res) {
        console.log('home');
        res.end('home');
    }
}
module.exports=app;
// app.login('req');
//
// app['login']('req');