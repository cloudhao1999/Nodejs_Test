var foo=require('foo');
/*foo在默认目录下面没有，没有的话nodejs会在node_modules里面找这个模块*/
console.log(foo.str);