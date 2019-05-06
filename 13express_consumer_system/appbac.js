
var express=require('express');
var ejs=require('ejs');
var app=new express();
var md5=require('md5-node');//md5加密
//保存用户信息
var session=require('express-session');
var DB=require('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\modules\\db.js');
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
//图片上传的插件使用
var multiparty = require('multiparty');/*图片上传模块*/
var http = require('http');
var util = require('util');
var fs=require('fs');
//使用ejs模板引擎
app.set('view engine','ejs');
//配置public目录为我们的静态资源目录
app.use(express.static('13express_consumer_system/public'));
app.use('/13express_consumer_system/upload',express.static('13express_consumer_system/upload'));
//ejs中全局数据 所有的页面都可以用
app.locals['userinfo']='123';
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
app.locals['userinfo']='1111111';
//自定义中间件 判断登陆状态

app.get('/',function (req,res) {
    res.send("login");
});
//登录
app.get('/login',function (req,res) {
    //res.send('login');
    //默认找views目录
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\login.ejs');
});

app.get('/product',function (req,res) {
    //res.send('product');
    //连接数据库查询数据
    //商品列表
    DB.find('product',{},function (err,data) {
        res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\product.ejs',{list:data});
    })
});

app.get('/productadd',function (req,res) {
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\productadd.ejs');


});
//获取表单提交的数据
app.post('/doProductAdd',function (req,res) {
    //获取表单的数据
    var form = new multiparty.Form();
    form.uploadDir='13express_consumer_system/upload';//上传图片保存的地址
    form.parse(req, function(err, fields, files) {
        // console.log(fields);//获取表单的数据
        // console.log(files);//图片上传成功返回的信息

        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];

        var pic=files.pic[0].path;
        console.log(pic);
        DB.insert('product',{
            title:title,
            price:price,
            fee:fee,
            description:description,
            pic:pic
        },function (err,data) {
            if(!err){
                res.redirect('/product');//上传成功跳转首页
            }
        })
    });
})

app.get('/productedit',function (req,res) {

    //获取get传值
    var id=req.query.id;
    //去数据库查询对应数据 自增长的ID
    DB.find('product',{"_id":new DB.ObjectID(id)},function (err,data) {
       // console.log(data);
        res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\productedit.ejs',{list:data[0]});
    })

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
//执行修改的路由
app.post('/doProductEdit',function (req,res) {
    var form = new multiparty.Form();
    form.uploadDir='13express_consumer_system/upload';//上传图片保存的地址
    form.parse(req, function(err, fields, files) {
         // console.log(files);
         // console.log(fields);
        var _id=fields._id[0];//修改的条件
        console.log(_id);
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];
        var originalFilename=files.pic[0].originalFilename;
        var pic=files.pic[0].path;
        if(originalFilename){//修改了图片
            var setData={
                title:title,
                price:price,
                fee:fee,
                description:description,
                pic:pic
            };
        }else{
            var setData={
                title:title,
                price:price,
                fee:fee,
                description:description,

            };
            fs.unlink(pic,function (err,data) {
                if(err){
                    console.log(err);
                }
            });
        }
        //删除生成的临时文件
        console.log(pic);



       // console.log(pic);
        DB.update('product',{"_id":new DB.ObjectID(_id)}, setData
        ,function (err,data) {
            if(!err){
                res.redirect('/product');
            }
        })
    });

})
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

// //删除数据
// app.get('/delete',function (req,res) {
//     DB.deleteOne('product',{"title":"we2"},function (error,data) {
//         if(!error){
//             res.send('删除数据成功');
//         }
//     })
// })
//删除商品
app.get('/productdelete',function (req,res) {
    //获取id
    var id=req.query.id;
    console.log(id);
    DB.deleteOne('product',{"_id":new DB.ObjectID(id)},function (err) {
        if(!err){
            res.redirect('/product');
        }
    })
    //res.send('productdelete');
})

app.listen(3000,'127.0.0.1');