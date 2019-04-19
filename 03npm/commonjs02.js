//npm install md5-node
//注意安装模块要把模块写入package.json配置文件

//npm install md5-node --save或者npm install md5-node --save-dev

//npm install md5-node --save会写入package.json里面的dependencies
//install md5-node --save-dev会写入package.json里面的devDependencies
//有时候npm下载慢,可以用cnpm淘宝镜像
//cnpm表示安装依赖


//如果安装完成淘宝镜像就可以用cnpm安装
//npm install -g cnpm --registry=https://registry.npm.taobao.org
var md5=require('md5-node');

console.log(md5('123456'));


var sd = require('silly-datetime');

var d=sd.format(new Date(),'YYYY-MM-DD HH:mm');

console.log(d);