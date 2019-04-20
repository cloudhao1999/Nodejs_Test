
var events=require('events');

//console.log(events);

var EventEmitter=new events.EventEmitter();
exports.getMime=function (fs,EventEmitter,extname) {
    fs.readFile('05nodejs_static_web/mime.json',function (err,data) {
        if(err){
            console.log('json文件不存在');
            return false;
        }
        //console.log(data.toString());

        var Mimes=JSON.parse(data.toString());
       // console.log(Mimes[extname]);

        var result= Mimes[extname] || 'text/html';

        EventEmitter.emit('to_mime',result);
    })

}