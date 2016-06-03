# R2框架
[R2框架](https://github.com/dog-days/r2)(Redux React Framework)主要是基于React、Redux而构建的(其他配合使用的还有当然也使用了react-router,react-router-redux,react-redux)。使用webpack模块加载工具，采用ES62015语法。所有如果要使用本框架，这些知识多多少少都要回点的。同时也使用了[Ant Design React](http://ant.design/#/docs/react/introduce)组件,页面生成功能采用的的组件就是Ant Design,目前只支持这种，后面页面生成也会支持多种UI组件。
R2框架旨在快速搭建页面，减少重复工作，减少重复代码，提高开发效率。

## R2框架相关阅读
- [webpack配置](http://blog.leanote.com/post/sams/webpack%E7%9F%A5%E8%AF%86%E7%82%B9%E6%BB%B4) 

## 框架目录
```
R2/
    - public/                      #项目最终生成处，直接拷贝到服务环境下即可访问
        index.html                 #生成环境的index.html    
        index_dev.html             #开发环境的index_dev.html    
        + js/                      #生成的js和样式文件都在里面
    - src/                         #框架和应用代码目录
        index.jsx                  #框架应用入口文件
        routes.js                  #路由配置处,可以自定义（不建议,后面会说到）
        reducers.js                #Redux reducers总入口
        store.js                   #Redux store配置处
        - libs/                    #类库自定义的类库,框架使用者的类库可以放这里
            + r2/                  #R2框架类库存放处，使用框架这不用理会
        + common                   #当前项目公共component和设置等存放处,约定方式
        - page/                    #项目页面模块开发代码，不同应用会有不用模块,有些文件是名称是不变的
            App.js                 #路由第一层"/"component
            commonAction.js        #可自定义的公共actionCreator
            reducer.js             #可自定义的公共reducer
            + layout               #layout文件存放处
            + nopage               #404页面
            - view                 #各个页面存放位置
                - index/           #应用页面demo,参考使用
                    index.js       #index页面入口文件
                    action.js      #Redux action，demo action任务定义处
                    reducer.js     #Redux reducer，demo reducer定义处
    + .fr/                         #智能功能开发处，框架使用者不用理会
    - style/                       #样式图片存放处,这个看喜好吧,约定方式
        + css/                     #css样式
        + img/                     #图片存放处
    Gruntfile.js                   #grunt配置文件,生成环境
    server.js                      #启动服务配置文件,开发环境
    webpack.config.js              #webpack配置，开发环境 
    package.js                     #npm配置文件
    .babelrc                       #babel设置
    .gitignore                     #git提交忽略设置
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
## 使用智能构建功能
经过上面的步骤可以运行看到页面了，现在开始看如何搭建一个新的页面，在搭建页面前先介绍R2框架自带的一些功能。
### 智能构建route和reducer
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
### 页面生成器
如果有使用过PHP Yii框架的gii，那就对这个功能有大概的理解了。R2框架也是模仿这种做法的,功能也正在逐步添加完善。

在浏览器中访问`http://localhost:8080/r2g/creator`,目前是长这样子。

![](leanote://file/getImage?fileId=574feb85b271cf4adf000001)

生成页面后运行`npm run ac`即可访问刚生成的页面。

## 页面新建约定 
页面都是在`R2/src/page/view`中新建,才有效。
### 新建一级页面
所谓一级页面就是指路由嵌套一层，如
```js
<Router history={browserHistory}>
    <Route path="/" component={App}>
    <Route path="about" component={About}/>
</Router>
```
新建文件夹目录如下
```
- about/
    index.jsx
    action.js //不是必须的 
    reducer.js //不是必须的 
```
### 新建二级页面
所谓二级页面就是指路由嵌套两层，而且R2框架智能生成的路由参数都是`:id`，目前还不支持变化。如
```js
<Router history={browserHistory}>
    <Route path="/" component={App}>
    <Route path="about" component={About}/>
    <Route path="users" component={Users}>
        <Route path="/user/:id" component={User}/>  #这里就是嵌套了两层的。
        <IndexRoute component={Index}/>
    </Route>
</Router>
```
这种情况下，就特殊点，先看下文件夹大概样子
```
- users/
    index.jsx
    action.js //不是必须的 
    reducer.js //不是必须的 
    - children //必须要有
        + index //newpage的indexRute,访问地址`/users`
        + user //访问地址`/users/user/5`
```
其中users是二级父组件，user是二级页面子组件。
### 页面后续改进
后面可能会改成支持自定义参数，不过目前这个确实也够用了，就是有点限制。
## 基本使用
先看下基本的页面index.jsx代码结构
```js
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
```js
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
    title: "title设置处",
});
```
### layout切换
layout默认是`page/layout/index.jsx`
可以在default props中覆盖，当设置为false时，就没有layout。
```js
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
    title: "title设置处",
    layout: false,//没layout
    //layout: "page/layout/other",//指向page/layout/other.jsx
});

```
### 面包屑
面包屑功能稍微特殊点，需要结合layout页面使用，而且layout组件必须继承`r2/module/LayoutAntdComponent`。目前的面包写是针对Ant Design UI做处理的。
面包屑默认自带首页，如果需要修改可以在layout组件中的default props修改
```js
otherLayout.defaultProps = {
    homeLink: {
        label:"主页",
        link:'/',
    },
};
```
在当前页面的index.jsx中设置如下：
```js
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
    title: "title设置处",
    layout: "page/layout/other",//layout不可以设置为false
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
### 自定义route
R2框架目标是让使用者可以不用理会路由层，不过也提供了自定义路由和覆盖已生成的路由。进入`R2/src/routes.js`,代码如下：

```js
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
## 其他的一些特殊模式
为了更好的管理代码，R2框架建议，所有React组件继承`r2/module/BasicComponent`(layout组件式特殊的一种)。之后新的组件包括页面index.jsx组件，数据逻辑处理请全部写在方法dataAdapter中，事件处理写在events中,redux 的dispatch actionCreator写在方法actions中。代码示例如下：
```js
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
## FAQ
正在整理，

## 感言
框架正在完善中，感兴趣的同学可有参与进来！或许这个框架正因为你变得更有意义！





