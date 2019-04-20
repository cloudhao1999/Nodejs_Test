


var fs=require('fs');

//1.fs.stat 检测是文件还是目录

// fs.stat('04 nodejs fs',function (err,stats) {
//     if(err){
//         console.log(err);
//
//         return;
//     }
//     console.log('文件：'+stats.isFile());
//     console.log('目录：'+stats.isDirectory());
// })

//2.fs.mkdir 创建目录
// 接受参数：
// path 将创建的目录路径
// mode 目录权限（读写权限），默认0777
// callback 回调，传递异常err
// fs.mkdir('css',function (err) {
//     if(err){
//         console.log(err);
//         return false;
//     }
//     console.log('创建目录成功');
// })

// 3.fs.writeFile 创建写入文件

// fs.writeFile('t.txt','你好nodejs',function (err) {
//     if(err){
//          console.log(err);
//          return false;
//      }
//     console.log('写入成功');
// })

// 4.fs.appendFile 追加文件

// fs.appendFile('t1.txt','这是写入的内容111\n',function (err) {
//     if(err){
//          console.log(err);
//          return false;
//      }
//     console.log('写入成功');
// })

//5.fs.readFile 读取文件
// fs.readFile('t1.txt',function (err,data) {
//     if(err){
//          console.log(err);
//          return false;
//      }
//     // console.log(data);
//     console.log(data.toString());
// })

// 6.fs.readdir() 读取目录 把目录下面的文件和文件夹都获取到
// fs.readdir('04 nodejs fs/html',function (err,data) {
//     if(err){
//          console.log(err);
//          return false;
//      }
//     console.log(data);
// })

//拿到一个文件夹下面的所有目录

// 7.fs.rename() 重命名
//1.改名 2.剪切文件
// fs.rename('04 nodejs fs/html/index','04 nodejs fs/html/news',function (err) {
//         if(err){
//         console.log(err);
//         return false;
//     }
//         console.log('改名成功');
// })
// fs.rename('04 nodejs fs/html/style.css','04 nodejs fs/html/css/basic.css',function (err) {
//             if(err){
//         console.log(err);
//         return false;
//     }
//         console.log('剪切成功');
// });

//8.fs.rmdir 删除目录
// fs.rmdir('04 nodejs fs/t',function (err) {
//                 if(err){
//         console.log(err);
//         return false;
//     }
//         console.log('删除成功');
// })

//9.fs.unlink 删除文件

fs.unlink('04 nodejs fs/index',function (err) {
                    if(err){
        console.log(err);
        return false;
    }
        console.log('删除文件成功');
})