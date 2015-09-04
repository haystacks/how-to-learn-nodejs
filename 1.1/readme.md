1.1 学习构建一个简单的web应用
---
##### index.js
入口文件
引入http服务、路由、控制器等文件，定义路由规则对应控制器方法
##### server.js
参照官网的例子做一个http服务，需要说明的一点变化是，api的接口变化  
原来的：`http.createServer()`  
现在的：`http.Server()`  
##### route.js
路由文件
**2015-09-01 22:57:18**  
新增：  
1. 添加非路由文件判断  
2. 对于加载的文件进行直接加载  
##### controller.js
控制器文件，定义控制器操作方法  
新增404 not found  

这里学习到新的知识：  
知识点一：:octocat:  
```js 
var sleep = function(milliseconds) {  
	var startTime = new Date().getTime();  
	while(new Date().getTime() < startTime + milliseconds);  
}
```
知识点二：:octocat:  
child process  
 ( ﹁ ﹁ ) https://nodejs.org/api/child_process.html  

```
2015-08-28 20:48:17 今天任性的什么也没学习，只是为了明天的考试，希望能够一切顺利  
早睡，明天需要早起
2015-08-29 21:51:12 今天考试过了，小黑本到手，终于可以放下心来安心学习了  
```
**2015-08-30 22:26:59**  
新增  
1. 添加文件读写操作，读取静态文件，文件中加载样式（这里有待解决问题）
问题描述：  
加载样式的按照pathname判断来源，现在样式文件直接就是访问文件来源  
解决办法：  
路由重写，路由添加对于其他文件的判断  
**2015-09-01 22:57:58**  
新增  
1. 新增other操作，主要针对直接加载文件操作，文件不存在返回404 not found  
2. 更正其他操作错误抛出异常操作，使用返回404 not found代替操作  
3. 待处理问题   
问题描述：  
加载css,js,image等等的头协议的未处理  
解决办法：  
重新针对各种情况完善相应的对于文件的类型的处理  
**2015-09-03 22:21:29**  
新增： type()  
content-type添加部分类型css，js，images，ico的处理  
删除一些无用的调试信息与引用信息  
##### 回顾总结
通过1.1的学习，我会简单的使用nodejs的一部分api，首先使用Server创建了http服务，紧接着创建了入口文件引入我们server.js，针对请求我们需要做出响应，于是我们需要创建一个路由文件，用于解析请求，使其找到指定的文件做出响应，响应就需要控制器文件，一个路由解析到一个方法，对于不同的方法做出不同的响应。  
在接下来的学习中我将会给自己提升一些难度，期待能遇见正在学习node的同学，一起提升。  
##### 参考资料
1. http://www.nodebeginner.org/index-zh-cn.html#blocking-and-non-blocking
2. http://nodejs.org
3. http://tool.oschina.net/commons
4. http://www.emoji-cheat-sheet.com/  （学习中来些娱乐）
