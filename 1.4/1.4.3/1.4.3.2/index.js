/**
 * 数组的解构赋值
 */
{
     let [a, b, c] = [1, 2, 3];
     //console.log(a, b, c);

     let {aa, cc, bb} = {aa: 1, bb: 2, cc: 3};
     //console.log(aa, bb, cc);
}

//默认值
{
    let [a, b = 3] = [1];
    //console.log(a, b);
    {
        let {a=1, b} = {b:3};
        //console.log(a, b);
    }
}

//第一个使用默认值的情况下，设置第二个值
{
    //let [a=1, b] = [undefined, 3];
    //console.log(a, b);
    {
        let {a=1, b} = {b:3};
        //let s = {a=1, b} = {b:3};//这种写法会暴露a,b到全局变量中去;
        //console.log(a, b);
    }
}
//console.log(a, b);

//字符串的解构
{
    let [a, b, c, d] = 'hello';
    let {length: len} = 'hello world';
    //console.log(a, b, c, d);
    //console.log(len);
}

//函数参数解构
{
    for(let a = 3; a < 5; a++) {
        //console.log(a);//3 4
    }
    //console.log(a);//ReferenceError

    function add([x=5, y]) {
        return x+y;
    }
    //console.log(add([3, 5])); //8
    //console.log(add([undefined, 5])); //10

    {
        function add({x, y} = {x:3, y:5}) {
            return x+y;
        }
        // console.log(add()); //8
        // console.log(add({x:4})); //NaN
        // console.log(add({})); //NaN
        // console.log({x:undefined, y:7}); //10
    }
    //
    {
        function test() {
            return {x:4, y:5, z:6};
            //return [4, 5, 6];
        }
        let {x, y, z} = test();
        //let [x, y, z] = test();
        //console.log(x, y, z);
    }
}

//practice 交换两个变量的值
{
    let a = 1;
    let b = 3;
    [a, b] = [b, a];
    //{a, b} = {a:b, b:a};//不能这么写 对象是个问题
    console.log(a, b);//3, 1
}
