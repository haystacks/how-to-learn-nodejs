1.2 对npm的package.json参数的学习
---
##### name
名称是必须的参数之一  
##### version
版本也是必须的参数之一  
##### description 
简单描述一下自己写的是个什么，我也不知道要写什么，所以就不写了吧。不过有一句话还是要说，package.json是一个标准的json文件，所以js对象什么的就不要写起来了。  
既然说到这里了，那就回忆一下他们之间区别，JSON采用完全独立于语言的文本格式，不同语言中解释不一样，js中符合json规范的js对象字面量的写法一致，故此常常我们称js中的对象字面量为json对象
json: json是一种轻量级的数据交换格式  
![json](http://json.org/object.gif)  
例如：  
``` var json = {"name": "unofficial", "learn": "nodejs"}; ```
##### keywords
关键字，keywords和description一样是方便搜索的，突然想到了meta标签中的这两个就是为了seo
##### homepage
主页，项目官网的url。  

注意：这和“url”不一样。如果你放一个“url”字段，registry会以为是一个跳转到你发布在其他地方的地址，然后喊你滚粗。 嗯，滚粗，没开玩笑。  

嗯，滚粗，没开玩笑。--这是一段来自mujiang.info的翻译  
##### bugs
就是留下你的信息，对于遇到问题了的人直接来找你  
例如：  
```
"bugs": {
	"email": "cangku#unofficial.cn",
	"url": ""
}
```
##### license
许可证  
##### people fields: author, contributors
作者或者合作者信息
```
{
	"name" : "unofficial", 
	"email" : "cangku#unofficial.cn", 
	"url" : "http://www.unofficial.cn/"
}
```
##### files
文件信息  
##### main
官方文档我描述不清楚  
可以这里理解：  
```
"main": "index"
```
执行node命令相当于执行的是 node index  
### 参考资料
1. https://docs.npmjs.com/files/package.json
2. json.org
3. http://www.cnblogs.com/TomXu/archive/2012/01/11/2311956.html