# R2框架

[R2框架](https://github.com/dog-days/r2)(Redux React Framework)主要是基于React、Redux而构建的(其他配合使用的还有当然也使用了react-router,react-router-redux,react-redux,immutable.js)。使用webpack模块加载工具，采用ES62015语法。所有如果要使用本框架，这些知识多多少少都要会点的。同时也使用了[Ant Design React](http://ant.design/#/docs/react/introduce)组件,生成的页面使用的UI是Ant Design,目前只支持这种，后面页面生成也会支持多种UI组件。
R2框架旨在快速搭建页面，减少重复工作，减少重复代码，提高开发效率。

## R2框架相关阅读

- [webpack配置](http://blog.leanote.com/post/sams/webpack%E7%9F%A5%E8%AF%86%E7%82%B9%E6%BB%B4) 

## 框架目录

```shell
R2/
    - public/                      		#项目最终生成处，直接拷贝到服务环境下即可访问
        index.html                 		#生成环境的index.html    
        index_dev.html             		#开发环境的index_dev.html    
        + js/                      		#生成的js和样式文件都在里面
    - src/                         		#框架和应用代码目录
        index.jsx                  		#框架应用入口文件
        routes.js                  		#路由配置处,可以自定义（不建议,后面会说到）
        reducers.js                		#Redux reducers总入口
        store.js                   		#Redux store配置处
        - libs/                    		#类库自定义的类库,框架使用者的类库可以放这里
            + r2/                  		#R2框架类库存放处，使用框架这不用理会
        + common                   		#当前项目公共component和设置等
        - page/                    		#页面级代码
            App.js                 		#路由第一层"/"component
            action.js        	   	    #可自定义的公共actionCreator
            reducer.js             		#可自定义的公共reducer
            + nopage               		#404页面
            + .viewModel           		#页面模板（后面详说）
            - view                 		#各个页面存放位置
                + layout           		#layout文件存放处
            		- main/
            			_route.js 	   		#路由设置处
            			.child_routes.js 	#自动生成，后面详解
                - index/           		#应用页面demo,参考使用
                	_route.js 	   	    #路由设置处
                    index.js       		#index页面入口文件
                    action.js      		#Redux action，demo action任务定义处，当然也可以没有
                    reducer.js     		#Redux reducer，demo reducer定义处，当然也可以没有
    + .end/                        		#智能功能开发处，框架使用者不用理会
    - style/                       		#样式图片存放处,这个看喜好吧,约定方式
        + css/                     		#css样式
        + img/                     		#图片存放处
    Gruntfile.js                   		#grunt配置文件，根据需要自己拓展配置h打包生成环境
    server.js                      		#启动服务配置文件,开发环境
    webpack.config.js              		#webpack配置，根据需要自己拓展配置，开发环境 
    package.js                     		#npm配置文件
    .babelrc                       		#babel设置
    .gitignore                     		#git提交忽略设置
```

## 安装使用

由于还没有正式的版本，可以clone或者下载本框架文件,然后运行下面命令。
通过nvm安装node（nvm可以管理多个版本node,可以来回切换,请使用v6.0.0以上）

```
//安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
//安装最新版node,并可以立刻使用node不用重启终端,安装时好像被墙了，通过vpn装成功
nvm install node && nvm alias default node
```

npm安装如果被墙可以使用[淘宝镜像](http://npm.taobao.org/)，但是使用cnpm有时候会安装不完全，下面会特别说明。

```
//如果没有安装grunt，请先安装要grunt。
npm install -g grunt-cli //安装全局命令
npm install //等待安装各种需要的package
cd .end && npm install//安装本框架node后端支持，部分功能需要用到
npm run ac
npm start
```

或者把`npm intall && cd .end && npm install`替换成`npm run i` 或 `npm run ci`(需要淘宝镜像支持)
然后直接在浏览中打开`http://localhost:8888/`,即可访问。

### R2框架命令

R2框架中自定义了如下命令

```
//运行服务，windows平台请使用,npm run startw
npm start 
```

```
//打包生成生产环境文件，windows平台请使用,npm run buildw
npm build 
```

```
//智能Route和Reducer生成命令,情况后续说明
npm run ac 
```

```
//开启R2框架后端服务支持，使用页面新建功能时最好开启需要开启，要不然看不了数据，详细后续说明
npm run startend 
```

```
//运行所有前端webpack和本框架的后端服务,windows使用npm run startwboth
npm run startboth 
```

`npm run startboth` 相当于 `npm start && npm run startboth`

```
npm run cv //页面生成,后续详说
```

## 智能构建

经过上面的步骤可以运行看到页面了，现在开始看如何搭建一个新的页面，在搭建页面前先介绍R2框架自带的一些功能。

### 智能构建route和reducer

何为智能route和reducer,在R2框架中，只要遵循view文件位置约定规则，route和reducer就可以通过命令生成！你没听错，是用R2框架是不用怎么关注路由和reducer绑定的！
运行一下命令即可

```
npm run ac  // ac全称auto creator
```

不过要注意的是，view文件要按照约定位置放好，`R2/src/page/view`目录下新建文件夹就属于一个新页面(必须包含文件_route.js，layout是特殊的view，有点不一样),而reducer生成条件是在view目录下新建reducer.js就会被视为新建reducer，本框架强烈建议在当前页面文件夹中新建reducer.js。

`npm run ac` 不带参数读取`R2/src/page/view`目录中文件，`npm run ac -- -m` 读取的时模板目录 `R2/src/page/.viewModel`，所有要查看模板，请运行`npm run ac -- -m`，之后在浏览器上访问指定模板即可。

其中`reducer.js`需要遵守一定格式！ `reducer.js`格式如下:

```jsx
export function origin(state = {}, action) {
    switch (action.type) {
        case RECIEVEORIGIN:     
        default:
            return state;
    }
}
```

不要使用下面这样的格式,虽然是没错，单目前R2框架还不支持智能识别这种格式。

```jsx
module.exports = {
    origin(state,action){}
}
```

### 页面生成器

需要使用到以下命令

```
npm run cv -- options 
```

options如下

| 缩写   | 全称                    | 描述                        |
| ---- | --------------------- | ------------------------- |
| -h   | --help                | 帮助命令                      |
| -V   | --version             | 版本命令                      |
| -e   | --emptyPage           | 创建emptyPage视图模板           |
| -n   | --noactionreducer     | 创建noactionreducer视图模板     |
| -t   | --tableNoPagination   | 创建tableNoPagination视图模板   |
| -p   | --tableWithPagination | 创建tableWithPagination视图模板 |
| -l   | --layout              | 指定创建视图的layout，配合上面的命令使用   |

例如：

```shell
npm run cv -- -p test -l main //不使用-l时，默认为main
```

## 基本使用

### layout模式

layout是特殊的一种view，其实就是react-router中的第二层组件（第一个是"/"，本框架是`src/page/App.jsx`），view是其子组件。以一种layout为例：

layout包括以下必要文件

- `_route.js`，用作路由生成

  ```jsx
  'use strict';
  var view = function(){
  	//这里try在浏览器中是多此一举，在智能路由中，后端node环境就需要,跳过r2Common未定义异常
  	var re; 
  	try{
  		re = `${r2Common.prefixUrl}`;
  	}catch(e){}
  	return re;
  }
  var childRoutes = function(){
  	var re;
  	try{
  		re = require('./.child_routes.js')//自动生成，不需理会
  	}catch(e){}	
  	return re;
  }
  module.exports = {
  	path: view(), 
      getComponent(location, cb) {
          require.ensure([], (require) => {
              cb(null, require("./index"))
          },"main")
      },
      childRoutes: childRoutes(),//这里是子组件view数组
  }
  ```

- `index.jsx`，传进react-router处理

```jsx
import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'

class View extends Component {
	constructor(props){
		super(props);//使用了构造器,必须要super(props)继承 
	}
    render() {
		super.render();//需要继承，本框架做了些处理，不继承，热替换失效。
		return (
			<div>
				{ this.props.children || "" }
			</div>
		)	
    }
}
var ReduxView = connect((state)=>{
	return {
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	homeLink: {
		label:<Antd.Icon type="home"/>,
		link:'/',
	},
});
module.exports = ReduxView; 
```

- .child_routes.js

  `.child_routes.js`是个隐藏文件，自动生成。

### view模式

view是我们代码开发主要地方，以下是必要文件，`action.js`和`reducer.js`看需要。

- `_route.js`,可当做二级路由（没layout）或三级路由（有layout）

```jsx
'use strict';
var view = function(){
	//这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过异常
	var re; 
	try{
		re = `${r2Common.prefixUrl}/about`;
	}catch(e){}
	return re;
} 
module.exports = {
	layout: "main",//在这里设置layout
	path: view(), 
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"about")//webpack生成文件命名
    },
}
```

- `index.jsx`代码结构

```jsx
import React from 'react'
import Component from 'r2/module/ModuleComponent'

class View extends Component {
    constructor(props){
        super(props);//使用了构造器,必须要super(props)继承 
    }
    render() {
        super.render();//需要继承，本框架做了些处理，不继承，热替换失效。
        return (
            <div></div>
        )
    }
}

var ReduxView = connect((state)=>{
    return {
    };
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
    title: "title设置处",
    breadcrumb:[
        {
            label:'home',
            link: '/',
        },
        {
            label:'导播活动列表',
        },
    ],
});
module.exports = ReduxView; 
```

### 设置浏览器标签title

R2框架是通过react default props设置title的， 在页面index.jsx中设置如下

```jsx
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
    title: "title设置处",
});
```

### layout切换

layout默认是`page/view/layout/main`，设置位置为每个view中的`_route.js`，代码如下。

```jsx
'use strict';
var view = function(){
	//这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过异常
	var re; 
	try{
		re = `${r2Common.prefixUrl}/about`;
	}catch(e){}
	return re;
} 
module.exports = {
	layout: "main",//在这里设置layout
	path: view(), 
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require("./index"))
        },"about")
    },
}
```

当设置为false时或者不设置，就没有layout。

### 面包屑

面包屑功能稍微特殊点，需要结合layout页面使用，目前的面包写是针对Ant Design UI做处理的。
面包屑默认自带首页，如果需要修改可以在layout组件中的default props修改。

修改layout组件默认的首页：

```jsx
//此处为layout组件
var ReduxView = connect((state)=>{
	return {
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	homeLink: {
		label:<Antd.Icon type="home"/>,
		link:'/',
	},
});
module.exports = ReduxView; 
```

在当前页面组件的index.jsx中设置如下：

```jsx
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
    title: "title设置处",
    breadcrumb:[
        {
            //还支持函数
            label:function(params){
                //params是R2从路由参数`:id`中解析处理，以`-`为分隔符。
                //如果当前路由为`/test/page/9_demo`,params = [9,'demo']
                return params[1];
            },
            link: function(parms){
                //同label
                return "test/page/"+params[0]; 
            },
        },
        {
            label:'循环存储查询',
            link: "/test",
        },
        {
            label:'循环存储查询',
        },
    ]
});
```

**展示**需要手动在当前的layout组件中添加，位置自定义：

```jsx
<div className="r2-breadcrumb">
	{ this.breadcrumb || "" }
</div>
```



### 自定义route

R2框架目标是让使用者可以不用理会路由层，不过也提供了自定义路由和覆盖已生成的路由。进入`R2/src/routes.js`,代码如下：

```jsx
import routes from '.fr/.temp/routes'
/**
 *   var routes = {
 *      path : "/",
 *      indexRoute: "",
 *      component: "",
 *      childRoutes: { }
 *  }
 */
//如果想自定义这里也是可以的,
//Object.assign(routes.childRoutes,{

//})
module.exports = routes;
```

如果不了解，请先了解[react-router](https://github.com/reactjs/react-router)

### 定义公共actionCreator

R2框架公共actionCreator定义于`R2/src/page/action`,建议公共的actionCreator就定义在这里（当然你想定义在其他地方也可以）。commonAction代码如下

```jsx
import * as r2ActionCreator from "r2/actionCreator"

let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
export const REQUESTLOGOUT = "REQUESTLOGOUT"
export const RECIEVELOGOUT = "RECIEVELOGOUT"

export function logout(successCallback,callbackAllStatus) {
    var url = r2Common.REQUESTURL + "/sop/v1/operators/logout";
    return r2fetch({
        method: 'POST',
        params:{},
        callbackAllStatus,
        successMessage: true,
    }).dispatchFetchOne(url,requestPosts(REQUESTLOGOUT,"logout"),receivePosts(RECIEVELOGOUT,"logout"),successCallback)
}
```

### 定义公共reducer

R2框架公共reducer定义于`R2/src/page/reducer`,建议公共的reducer就定义在这里（当然你想定义在其他地方也可以）,然后运行`npm run ac`进行reducer绑定。代码如下

```jsx
import * as actionCreator from './action' 

export function logout(state = {}, action) {
    switch (action.type) {
        
        case actionCreator.REQUESTLOGOUT: 
        case actionCreator.RECIEVELOGOUT:   
            return Object.assign({}, state,action);
        
        default:
            return state;
    }
}
```

### 全局变量定义

目前R2框架的全局变量如下，详细情况API。

- r2fn,公共常用方法
- r2ActionCreator,公共actionCreator
- r2fetch,R2封装的fetch方法
- r2Common,公共才设置或其他公共方法或公共变量

## 其他的一些特殊模式

为了更好的管理代码，R2框架建议，所有React组件继承`r2/module/BasicComponent`(layout组件式特殊的一种)。之后新的组件包括页面index.jsx组件，数据逻辑处理请全部写在方法dataAdapter中，事件处理写在events中,redux 的dispatch actionCreator写在方法actions中。代码示例如下：

```jsx
import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'

class View extends Component {
    constructor(props){
        super(props); 
    }
    
    actions(){
        return {
            getData(){
                this.props.dispatch(actionCreator());
            },
        }
    }
        
    dataAdapter(){
        return {
            sortData(){
                this.props.data.sort((a,b)=>{
                    return b-a;
                })
            },
        } 
    }
    
    events(){
        return {
            handleClick(text){
                return (e)=>{
                    console.debug(text)
                    console.debug(e)
                }
            }
        }
    }
    
    render() {
        super.render();
        this.sortData();
        return (
            <div onClick={this.handleClick("骚年！")}>
                Hello Word!
            </div>
        )   
    }
}
module.exports = View; 
```

定义在dataAdapter和events中的方法可以被组件`this`直接访问，R2框架内部做了处理。事件绑定也建议使用thunk模式。

## 可能会遇到的坑

### 使用淘宝镜像问题

使用cnpm install有些包会出问题（mac上），把报错包卸掉，使用npm安装就没问题。
以下是cnpm安装后报错报

- extract-text-webpack-plugin 

## FAQ

正在整理。 


