var express=require('express');
var router=express.Router();
var DB=require('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\modules\\db.js');
router.get('/',function (req,res) {
     // res.send('显示用户首页');
    DB.find('user',{},function (err,data) {
        res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\admin\\user\\index.ejs',{list:data});
    })
})

router.get('/add',function (req,res) {
    res.send('增加用户');
})

module.exports=router;//暴露router模块
