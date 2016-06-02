# R2框架
[R2框架](https://github.com/dog-days/r2)主要是基于React、Redux而构建的(其他配合使用的还有当然也使用了react-router,react-router-redux,react-redux)。使用webpack模块加载工具，采用ES6语法。所有如果要使用本框架，这些知识多多少少都要回点的。同时也使用了[Ant Design React](http://ant.design/#/docs/react/introduce)组件,页面生成功能采用的的组件就是Ant Design,目前只支持这种，后面页面生成也会支持多种UI组件。
R2框架旨在快速搭建页面，减少重复工作，减少重复代码，提高开发效率。
## 框架目录
```
R2/
	- public/                      #项目最终生成处，直接拷贝到服务环境下即可访问
	    index.html                 #生成环境的index.html    
	    index_dev.html             #开发环境的index_dev.html    
	    + js/                      #生成的js和样式文件都在里面
	- src/						   #框架和应用代码目录
	    index.jsx                  #框架应用入口文件
		routes.js 			       #路由配置处,可以自定义（不建议,后面会说到）
		reducers.js 		       #Redux reducers总入口
		store.js 			       #Redux store配置处
		- libs/					   #类库自定义的类库,框架使用者的类库可以放这里
		    + r2/                  #R2框架类库存放处，使用框架这不用理会
		+ common                   #当前项目公共component和设置等存放处,约定方式
		- page/					   #项目页面模块开发代码，不同应用会有不用模块,有些文件是名称是不变的
			App.js 				   #路由第一层"/"component
			App.js 				   #路由第一层"/"component
		    + layout               #layout文件存放处
		    + nopage               #404页面
		    - view                 #各个页面存放位置
    			- index/ 		   #应用页面demo,参考使用
    				index.js 	   #index页面入口文件
    				action.js      #Redux action，demo action任务定义处
    				reducer.js     #Redux reducer，demo reducer定义处
    + .fr/                         #智能功能开发处，框架使用者不用理会
	- style/					   #样式图片存放处,这个看喜好吧,约定方式
		+ css/					   #css样式
		+ img/ 					   #图片存放处
	Gruntfile.js 				   #grunt配置文件,生成环境
	server.js      				   #启动服务配置文件,开发环境
	webpack.config.js 			   #webpack配置，开发环境 
	package.js  				   #npm配置文件
```
## 安装使用  
首先clone或者下载本框架文件,然后运行下面命令。
通过nvm安装node（nvm可以管理多个版本node,可以来回切换,请使用v6.0.0以上）
```
//安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
//安装最新版node,并可以立刻使用node不用重启终端,安装时好像被墙了，通过vpn装成功
nvm install node && nvm alias default node
```
npm安装如果被墙可以使用[淘宝镜像](http://npm.taobao.org/)
```
//如果没有安装grunt，请先安装要grunt。
npm install -g grunt-cli //安装全局命令
npm install //等待安装各种需要的package
npm run ac
npm start
```
然后直接在浏览中打开`http://localhost:8080/`,即可访问。
### R2框架命令
R2框架中自定义了如下命令
```
npm start //运行服务，windows平台请使用,npm run startw
```
```
npm build //打包生成生产环境文件，windows平台请使用,npm run buildw
```
```
npm run ac //智能Route和Reducer生成命令,情况后续说明
```
```
npm run startend //开启R2框架后端服务支持，在智能构建页面是需要开启，详细后续说明
```
## 使用
经过上面的步骤可以运行看到页面了，现在开始看如何搭建一个新的页面，在搭建页面前先介绍R2框架自带的一些功能。
### 使用智能route和reducer
何为智能route和reducer,在R2框架中，只要遵循view文件位置约定规则，route和reducer就可以通过命令生成！你没听错，是用R2框架是不用怎么关注路由和reducer绑定的！
运行一下命令即可
```
npm run ac  // ac全称auto creator
```
不过要注意的是，view文件要按照约定位置放好，`R2/src/page/view`目录下新建文件夹就属于一个新页面（要有index.jsx文件才算，action.js和reducer.js可有可以无）,而reducer.js文件需要使用如下格式才可以被识别
```js
export function origin(state = {}, action) {
    switch (action.type) {
		case RECIEVEORIGIN: 	
        default:
			return state;
    }
}
```
不要使用下面这样的格式,虽然是没错，单目前R2框架还不支持智能识别这种格式。
```
module.exports = {
    origin(state,action){}
}
```
### 使用R2框架页面生成器
如果有使用过PHP Yii框架的gii，那就对这个功能有大概的理解了。R2框架也是模仿这种做法的,功能也正在逐步添加完善。

在浏览器中访问`http://localhost:8080/r2g/creator`,目前是长这样子。

![](leanote://file/getImage?fileId=574feb85b271cf4adf000001)

生成页面后运行`npm run ac`即可访问刚生成的页面。

## FAQ
正在整理，

## 感言
框架正在完善中，感兴趣的同学可有参与进来！






