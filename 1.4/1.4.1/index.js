/**
 * ES6 in nodejs
 * 1. SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode
 * 2. 
 */
'use strict';
//1,2,3,4,5
//var i = 1,j = 1;
/*for(;i<6;i++) {
	console.log(i);
}*/
/*for(;i<6;i++) {
	var bar = i;
	let par = i;
}*/
//console.log(par); //par is not defined

/*function fun() {
	var i;
	console.log(j);
	i = 123;
	let j = 123;
}
fun();*/
//var i = 1;
function show() {
	console.log(i); //undefined
	var i;
}
show();
function show() {
	console.log(i); // i is not defined
	let i;
}
show();