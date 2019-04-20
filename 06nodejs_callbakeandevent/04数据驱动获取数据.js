var fs=require('fs');

var events=require('events');

var EventEmitter=new events.EventEmitter();


function getMime(callback) {

    fs.readFile('06nodejs_callbakeandevent/mime.json',function (err,data) {
     EventEmitter.emit('data',data);
 })
}
getMime();//执行方法
//监听广播数据
EventEmitter.on('data',function (mime) {
    console.log(mime.toString());
})
