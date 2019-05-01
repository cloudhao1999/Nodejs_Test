var MongoClient = require('mongodb').MongoClient;//引入数据库
var DBurl='mongodb://localhost:27017/productmanage';

function connectDb(callback) {
    MongoClient.connect(DBurl,function (err,client) {
        if(err){
            console.log(err);
            return;
        }
        var db=client.db('productmanage');
            //增加修改删除显示

        callback(db);
    })
}
//数据库查找
//db.find('user',{},function()){
//})
exports.find=function (collectionname,json,callback) {
    connectDb(function (db) {
      var result = db.collection(collectionname).find(json);
      result.toArray(function (error,data) {
          callback(error,data);//拿到数据执行回调函数
          db.close();
      })
    })
}
//插入数据
exports.insert=function (collectionname,json,callback) {
    connectDb(function (db) {
        db.collection(collectionname).insertOne(json,function (error,data) {
            callback(error,data);
        })
        })
}

//修改数据
exports.update=function (collectionname,json1,json2,callback) {
    connectDb(function (db) {
        db.collection(collectionname).updateOne(json1,{$set:{json2}},function (error,data) {
            callback(error,data);
        })
    })
}

//删除数据
exports.deleteOne=function (collectionname,json,callback) {
    connectDb(function (db) {
        db.collection(collectionname).deleteOne(json,function (error,data) {
            callback(error,data);
        })
    })
}
