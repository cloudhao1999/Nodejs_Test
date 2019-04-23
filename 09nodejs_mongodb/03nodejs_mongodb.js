//1.npm install mongodb --save--dev
//2.var MongoClient = require("mongodb").MongoClient;
var http=require('http');
var ejs=require('ejs');
var url=require('url');
var MongoClient = require('mongodb').MongoClient;//引入数据库
var DBurl='mongodb://localhost:27017/student';//链接数据库的地址 student数据库名称
var app=require
('C:\\Users\\i\\WebstormProjects\\nodejs\\08 nodejs router\\model\\express-route.js');
http.createServer(app).listen(3000);
//注册login这个路由(方法)
app._get('/',function (req,res) {
    MongoClient.connect(DBurl,function (err,client) {
        if(err){
            console.log("链接数据库失败");
            return;
        }//查询数据
        var list=[];//放数据库查询的数据
        var db=client.db('student');
        var result=db.collection('user').find({}).limit(10);
        result.each(function (error,doc) {
            if(error){
                console.log(error);
            }//查询数据
            else{
                if(doc!=null){
                    list.push(doc);
                }else{//doc==null表示循环完成
                     console.log(list);
                    //获取数据
                    ejs.renderFile('C:\\Users\\i\\WebstormProjects\\nodejs\\09nodejs_mongodb\\views\\index.ejs',{list:list},function (err,data) {
                        res.send(data);
                    });
                    console.log("111");
                }
            }

        })
        // console.log(result);
    })
    // var msg='这是数据库的数据';

   // res.end('login');
})

app._get('/add',function (req,res) {
    MongoClient.connect(DBurl,function (err,client) {
        if(err){
            console.log("链接数据库失败");
            return;
        }
        var db=client.db("student");
        db.collection('user').insertOne({"name":"lisi","age":40},function (error,data) {
            if(error){
                console.log("增加数据失败");
            }
            console.log(data);
            res.send('增加数据成功');
            client.close();
        })
    })
})





