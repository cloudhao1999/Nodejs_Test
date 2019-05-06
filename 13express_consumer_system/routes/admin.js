var express=require('express');
var router=express.Router();
//后台路由 所有的后台处理都要经过
var login=require('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\routes\\admin\\login.js');
var product=require('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\routes\\admin\\product.js');
var user=require('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\routes\\admin\\user.js');
router.use(function (req,res,next) {

    // console.log(req.url);
    if(req.url=='/login'||req.url=='/login/doLogin'){
        next();
    }else{
        if(req.session.userinfo && req.session.userinfo.username!=''){
            // app.locals 全局
            // req.app.locals 请求的
            req.app.locals['userinfo']=req.session.userinfo;//配置全局变量可以在任何模板使用
            next();
        }else{
            res.redirect('/admin/login');
        }
    }
})
//配置路由
router.use('/login',login);
router.use('/product',product);
router.use('/user',user);
module.exports=router;//暴露router模块
