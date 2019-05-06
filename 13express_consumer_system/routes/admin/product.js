var express=require('express');
var router=express.Router();
var fs=require('fs');
var DB=require('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\modules\\db.js');
//图片上传的插件使用
var multiparty = require('multiparty');
router.get('/',function (req,res) {
    DB.find('product',{},function (err,data) {
        res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\admin\\product\\index.ejs',{list:data});
    })
})

router.get('/add',function (req,res) {
    // res.send('商品增加');
    res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\admin\\product\\add.ejs');
})
router.post('/doAdd',function (req,res) {
    // res.send('商品增加');
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
                res.redirect('/admin/product');//上传成功跳转首页
            }
        })
    });
})
router.get('/edit',function (req,res) {
    // res.send('商品修改');
    //获取get传值
    var id=req.query.id;
    //去数据库查询对应数据 自增长的ID
    DB.find('product',{"_id":new DB.ObjectID(id)},function (err,data) {
        // console.log(data);
        res.render('C:\\Users\\i\\WebstormProjects\\nodejs\\13express_consumer_system\\views\\admin\\product\\edit.ejs',{list:data[0]});
    })
})
router.post('/doEdit',function (req,res) {
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
                    res.redirect('/admin/product');
                }
            })
    });
})
router.get('/delete',function (req,res) {
    // res.send('商品删除');
    //获取id
    var id=req.query.id;
    console.log(id);
    DB.deleteOne('product',{"_id":new DB.ObjectID(id)},function (err) {
        if(!err){
            res.redirect('/admin/product');
        }
    })
})
module.exports=router;//暴露router模块
