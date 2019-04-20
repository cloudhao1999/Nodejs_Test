//1.判断服务器上有没有upload目录，没有创建这个目录（图片上传）
//要用fs目录必须引入fs
 var fs=require('fs');
// fs.stat('04 nodejs fs/upload',function (err,stats) {
//     if(err){//没有目录就创建
//         fs.mkdir('04 nodejs fs/upload',function (error) {
//             if(error){
//                 console.log(error);
//                 return false;
//             }
//             console.log('创建成功');
//         })
//     }else{
//         console.log('目录已经存在');
//         console.log(stats.isDirectory());
//     }
//
// })

//2.找出html目录下面的所有目录，然后打印出来
// 错误写法 fs.readdir('04 nodejs fs/html',function (error,files) {
//             if(error){
//                 console.log(error);
//                 return false;
//             }else {//判断是目录还是文件
//                 console.log(files);//遍历数组
//                 for(var i=0;i<files.length;i++){
//                     console.log(files[i]);
//                 //     fs.stat(files[i],function (err,stats) {//循环判断是目录还是文件 --异步 错误写法
//                 // console.log(files[i]);
//                 //     })
//                 }
//             }
// })

//正确写法
var fileArr=[];
fs.readdir('04 nodejs fs/html',function (err,files) {
            if(err){
                console.log(err);

            }else {//判断是目录还是文件
                console.log(files);//遍历数组

                (function getFile(i){
                    if(i==files.length){//循环结束
                        console.log('目录：');
                        console.log(fileArr);
                        return false;
                    }
                    fs.stat('04 nodejs fs/html/'+files[i],function (error,stats) {

                 if(stats.isDirectory()){//目录
                     fileArr.push(files[i]);//保存数据
                 }
                 //递归调用
                        getFile(i+1);
                      })
                })(0)
            }
})


