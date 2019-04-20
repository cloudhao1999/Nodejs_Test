var fs=require('fs');

//创建一个可读流
var readerStream=fs.createReadStream('04 nodejs fs/input');
//创建一个可写流
var writerStream=fs.createWriteStream('04 nodejs fs/output');

//管道读写操作
//读取input.txt内容，并将内容写到output.txt文件中
readerStream.pipe(writerStream);
console.log('程序执行完毕');