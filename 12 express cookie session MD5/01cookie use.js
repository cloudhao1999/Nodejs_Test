
var express=require('express');
var cookieParser=require('cookie-parser');

var app=express();
app.use(cookieParser());
app.get('/',function (req,res) {
    // console.log(req.cookies);
    //console.log(req.cookies);//获取加密的cookie信息
    res.send('您浏览过的城市'+req.cookies.cities);
})

app.get("/lvyou",function (req,res) {
    var city=req.query.city;
    console.log(city);
    var cities=req.cookies.cities;
    if(cities){
        cities.push(city);
    }else{
        cities=[];//没有浏览过任何城市的话cities改为数组
        cities.push(city);
    }
    res.cookie('cities',cities,{maxAge:6000000});
    res.send('您浏览的城市是'+city);
})
app.listen(3000,'127.0.0.1');