//字符串
'use strict';

/**
 * charAt() 方法返回字符串中指定位置的字符。
 */
{
    let s = 'hello world';
    //console.log(s.charAt(1));
    //console.log(s[1]);
}

//
{
    let who = 'unofficial';
    let s = `
        i am ${who}
    `;
    //console.log(s);
}

//concat()
{
    const a = 1;
    const b = 2;
    let s = 'number say:';
    s = s.concat(`a is ${a},`, ` b is ${b}.`);
    console.log(s);
}

//indexOf lastIndexOf
{
    let s = 'hello';
    //console.log(s.indexOf('l'));//left
    //console.log(s.lastIndexOf('l'));//return the index from left;
}

//anchor link
{
    let a = '超链接';
    let linkUrl = a.link('http://www.baidu.com');//return a link
    let linkName = a.anchor('www.baidu.com');//return a link
    console.log(linkUrl, linkName);
}
