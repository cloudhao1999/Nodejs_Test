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
    var msg='这是数据库的数据';
    ejs.renderFile('C:\\Users\\i\\WebstormProjects\\nodejs\\08 nodejs router\\views\\index.ejs',{msg:msg},function (err,data) {
        res.send(data);
    });
    res.end('login');
})
app._get('/add',function (req,res) {
    //增加数据
  MongoClient.connect(DBurl,function (err,client) {
      if(err){
          console.log(err);
          console.log('数据库连接失败');
          return;
      }//增加数据
      var db=client.db("student");
      db.collection('user').insertOne({"name":"chen","age":10},function (error,result) {
          if(error){
              console.log('增加失败');
              return;
          }

          client.close();//关闭数据库
          res.send('增加数据成功');
      })
  })
})

app._get('/edit',function (req,res) {
    //增加数据
    MongoClient.connect(DBurl,function (err,client) {
        if(err){
            console.log(err);
            console.log('数据库连接失败');
            return;
        }//增加数据
        var db=client.db("student");
        db.collection('user').updateOne({"name":"chen"},{$set:{"age":40}},function (error,data) {
       if(error){
           console.log("修改数据失败");
           return;
       }
       console.log(data);
       res.send("修改数据成功");
       client.close();
        })
    })
})

app._get('/delete',function (req,res) {
    //增加数据
    //delete?name=xug
    var query=url.parse(req.url,true).query;//拿到name值
    var name=query.name;
    console.log(query.name);
    MongoClient.connect(DBurl,function (err,client) {
        if(err){
            console.log(err);
            console.log('数据库连接失败');
            return;
        }//增加数据
        var db=client.db("student");
        db.collection('user').deleteOne({"name":name},function (error,data) {
            if(error){
                console.log("删除数据失败");
                return;
            }
            console.log(data);
            res.send("删除数据成功");
            client.close();
        })
    })
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




