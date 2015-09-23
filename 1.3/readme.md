1.3 模块化--编写通用模块
---
##### 预定义变量
###### require
> require函数可以引入模块与json文件 —— 1.3.1  

###### exports
> exports导出函数 —— 1.3.1  

###### module
> module.exports导出json对象与函数 —— 1.3.1  

##### 模块初始化
> 一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。 —— 1.3.2  
自我理解：多次require依然是指向同一个对象。既require引入模块的时候就是初始化模块，后续引入依然指向的是第一次引入时初始化的对象。  

##### 参考资料
1. [七天学会NodeJS](http://nqdeng.github.io/7-days-nodejs)
2. [nodejs api module](https://nodejs.org/api/modules.html)
3. [模块的初始化](http://www.ituring.com.cn/article/177569)