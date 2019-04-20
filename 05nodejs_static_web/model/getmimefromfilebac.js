

exports.getMime=function (fs,extname) {//获取后缀名方法
    //.html
    fs.readFile('05nodejs_static_web/mime.json',function (err,data) {
        if(err){
            console.log('json文件不存在');
            return false;
        }
        //console.log(data.toString());

        var Mimes=JSON.parse(data.toString());
       // console.log(Mimes[extname]);

        return Mimes[extname] || 'text/html';
    })

}