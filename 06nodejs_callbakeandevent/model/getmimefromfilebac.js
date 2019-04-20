

exports.getMime=function (fs,extname,callback) {
    fs.readFile('05nodejs_static_web/mime.json',function (err,data) {
        if(err){
            console.log('json文件不存在');
            return false;
        }
        //console.log(data.toString());

        var Mimes=JSON.parse(data.toString());
       // console.log(Mimes[extname]);

        var result= Mimes[extname] || 'text/html';
        callback(result);
    })

}