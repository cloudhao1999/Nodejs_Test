var express=require('express');
var router=express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
var md5=require('md5-node');//md5加密
// parse application/json
var DB=require('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\modules\\db.js');
router.use(bodyParser.json())
router.get('/',function (req,res) {
    // res.send('登录');
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\admin\\login.ejs');
})
//处理登录的业务逻辑
router.post('/doLogin',function (req,res) {
    // res.send('admin user');
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
            res.redirect('/admin/product');//跳转到商品列表
        }else{

            // console.log("登陆失败");
            res.send("<script>alert('登录失败');location.href='/admin/login'</script>");
        }

    })
})
router.get('/loginOut',function (req,res) {
    //销毁session
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/login');
        }
    })
})
module.exports=router;//暴露router模块
