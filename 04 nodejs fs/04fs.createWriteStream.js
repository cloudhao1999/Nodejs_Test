var fs=require('fs');
var data='我是从数据库获取的数据，我要保存起来';

//创建一个可以写入的流，写入到文件output.txt中
var writerStream=fs.createWriteStream('04 nodejs fs/output');
for(var i=0;i<100;i++){
    writerStream.write(data,'utf8');
}


//标记写入完成
writerStream.end();

writerStream.on('finish',function () {
    console.log('写入完成');
})
//失败
writerStream.on('error',function () {
    console.log('写入失败');
})