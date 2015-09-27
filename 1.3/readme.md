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

##### 主模块
> 程序启动时首先加载的程序。例如 1.3.2 的index.js  

##### 二进制模块
> 除了js编写模块以外，还能使用c/c++编写.node模块。

##### 总结
1. Nodejs是一个JS脚本解析器。跨平台是因为复制了Nodejs到各个平台下，然后添加路径到系统变量中，即可在命令行使用```node```命令  
2. 尽量只使用js编写模块。连C语言都不会人也只能如此了。  

##### 代码的组织和部署
NodeJS编写程序前，为了有个良好的开端，首先需要准备好代码的目录结构和部署方式，就如同修房子要先搭脚手架。  

###### 模块路径解析规则
require支持```/```和盘符绝对路径，也支持```./```的相对路径。但是路径如果一变化，整过过程就折腾的够呛，php也有类似的经历。  
**内置模块**
> 直接传递模块名
```
var fs = require('fs');
```

**自定义模块（node_modules）**
> node自定义了一个node_modules模块来存放模块信息，安装模块后存放模块的位置。模块名/文件名，不指定文件名的情况下默认index.js，指定文件名调用指定的文件（unofficial/main）。
```
var unofficial = rquire('unofficial');
```

##### package
> 上文已经涉及到了  

##### npm
> npm作为nodejs的生态圈，这个包管理的使用也很重要
```
npm install unofficial
npm install unofficial@0.0.1 //安装包0.0.1版本的unofficial
npm install //按照package.json安装
npm help //查看更多命令
```

##### 文件操作
> 这里才正式开始  

##### 参考资料
1. [七天学会NodeJS](http://nqdeng.github.io/7-days-nodejs)
2. [nodejs api module](https://nodejs.org/api/modules.html)
3. [模块的初始化](http://www.ituring.com.cn/article/177569)