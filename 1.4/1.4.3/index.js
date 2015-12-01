'use strict';
//console.log([1,2,3].map(x => x * x));

//1.4.3.1 let的作用域是代码块内有效
{
    var a = 1;
    let b = 11;
}
//console.log(a);
//console.log(b);

/**
 * 1.4.3.1
 */
var obg = {
    i: '123'
}
var a = [];
for(let i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    };
}
//a[6]();
//var 定义的是一个全局变量，循环的时候每次都重置了i
for(var i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    };
}
//a[6]();

/**
 * 1.4.3.1
 */
//console.log(b);
var b = 123;

//console.log(c);//引用错误
let c = 123;

if(true) {
    c = 456;//引用错误
    let c = 123;
    //console.log(c);
}

function bar(x = y, y = 2) {
    console.log(x, y);
}
bar();//have a question
