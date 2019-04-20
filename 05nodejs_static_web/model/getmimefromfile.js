

exports.getMime=function (fs,extname) {//获取后缀名方法
    //.html
    // fs.readFile('05nodejs_static_web/mime.json',function (err,data) {
    //     if(err){
    //         console.log('json文件不存在');
    //         return false;
    //     }
    //     //console.log(data.toString());
    //
    //     var Mimes=JSON.parse(data.toString());
    //    // console.log(Mimes[extname]);
    //
    //     return Mimes[extname] || 'text/html';
    // })
    //把读取改成同步
    var data=fs.readFileSync('05nodejs_static_web/mime.json');
    //data.toString转换成json字符串
    var Mimes=JSON.parse(data.toString());
    return Mimes[extname] || 'text/html';
}