### # es6语法学习
#### 环境构建
在学习es6的时候，由于不是所有的环境均支持es6或者es7的新特性，于是需要学习用到babel  
1. 安装babel  
```babel
npm i -g babel-cli
npm i babel-preset-es2015 --save
```
2. 创建配置文件  
```
{
    "presers": ["es2015"]
}
```
3. 初次测试
```index.js
console.log([1,2,3].map(x => x * x));
# babel index.js
console.log(console.log([1,2,3].map(function(x){
    return x*x;
})));
# 这样添加参数输出文件
babel index.js -o es5-index.js
# 或者这样写
babel index --out-file es5-index
# 输出目录-d，输出source map文件 -s
babel -d build-dir source-dir -s
```

4. let, const, var, import, export

5. 解构赋值  
参考资料:[mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)  

6.
