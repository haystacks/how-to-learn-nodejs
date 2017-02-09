/**
 * ES6 in nodejs
 * 1. SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode
 * 2. scope
 */
'use strict';
/*
 * code 1
 * Declarations
 * var 		声明变量
 * let 		声明代码块内局部变量
 * const 	声明只读命名常量
 * 其中在全局范围内带var与不带var的区别，带var就是声明了一个全局/局部变量（作用域为函数作用域），带与不带var都是在当前作用域下声明了一个变量（作为当前对象下的属性），并且，delete不能删除var声明的变量
 * var a = 1; delete a; //false
 * b = 1; delete b; //true
 */
var a = 1;
/*code 1*/
function get() {
	console.log(a);
}
get(); //1

/*code 2*/
var a = 1;
delete a; //false
function get() {
	console.log(a);
}
get(); //1

/*code 3*/
function get() {
	var a = 2;
	console.log(a);
}
get(); //2

/*code 4*/
function get() {
	console.log(a);
	var a = 3;
}
get(); //undefined

/*code 5*/
var a = 1;
function get() {
	console.log(a);
	a = 4;
}
get(); //1
console.log(a); //4

/*code 5*/
function get() {
	console.log(a);
	a = 4;
}
get(); //a is not defined; end;
//start;
console.log(a); //a is not defined

