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
早睡明天需要早起
```
##### 参考资料
1. http://www.nodebeginner.org/index-zh-cn.html#blocking-and-non-blocking
2. http://nodejs.org
3. http://www.emoji-cheat-sheet.com/（学习中来些娱乐）
