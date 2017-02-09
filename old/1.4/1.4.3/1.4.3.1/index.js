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
    //c = 456;//引用错误
    let c = 123;
    //console.log(c);
}

// function bar(x = y, y = 2) {
//     console.log(x, y);
// }
//bar();//have a question, es6支持形参赋值，且形参作用域是代码块作用域


/**
 * let申明后
 */
let aa = 10;
//var aa = 11;//let不允许重复申明并赋值
//let aa = 12;//注释同上
//console.log(aa);

/**
 * var申明后
 */
var bb = 1;
var bb = 2;//var允许重复申明赋值
var bb;//已经存在的变量重复申明无意义，不会重置为undefined
var cc;
//console.log(bb);
//console.log(cc);

/**
 * es5只有全局作用域与函数作用域 es6代码块级作用域
 */
 var a = 123456;
 function fun() {
     var a = 1;
     let b = 2;
     if(1) {
         var a = 3;
         let b = 4;
     }
     console.log(a, b);
     return 123;
 }
// console.log(a);
// fun();

/**
 * 函数赋值给变量，变量本身的作用域, 函数赋值变量的默认作用域为块级作用域
 */
 {
     function fun() { return 456; }
 }
//console.log(fun());

/**
 * const 以及 const的作用域
 */
const PI = 3.1415926;
//console.log(PI);
//PI = 3.14;//const是定义一个常量，不能重复定义
{
    const PI = 3.14;
    //console.log(PI);//const的作用域是块级作用域同let
}
//console.log(PI);//const的作用域是块级作用域同let
//var PI;//error
//let PI;//error

/**
 * 常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。
 */
const foo = [];
foo.push('i am const, i can do this');
//console.log(foo.length);//1
//foo = ['i am const, i can do this. other!'];

/**
 * 冻结一下常量对象
 */
const foo1 = {};
foo1.a = 123;
//console.log(foo1);

const foo2 = Object.freeze({});
// foo2.a = 123;
// console.log(foo2);

/**
 * 跨模块常量
 * a.js
 * b.js
 */
 export const A = 1;
 export const B = 2;
 //export const C = 3;

/**
 * 全局对象属性
 * browser window
 * nodejs global
 */
 var a = 123;
 console.log(window.a);
 window.a = 234;
 console.log(a);

 let b1 = 456;
 console.log(window.b);
