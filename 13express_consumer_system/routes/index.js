var express=require('express');
var router=express.Router();

router.get('/',function (req,res) {
    res.send('admin index');
})

router.get('/user',function (req,res) {
    res.send('admin user');
})
router.get('/product',function (req,res) {
    res.send('product页面');
})
module.exports=router;//暴露router模块
