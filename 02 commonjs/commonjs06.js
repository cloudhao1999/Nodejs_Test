//var bar=require('bar/bar.js');
var nav=require('nav');

//nav在根目录不存在,去node_mudles,找到了nav文件夹，nav文件夹下面有package.json入口文件的“main”:"nav.js"
console.log(nav.str);


//npm安装的模块就是这样引入的

//package.json  npm init --yes 进入这个根目录运行这个命令