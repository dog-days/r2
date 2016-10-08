import React from 'react'
import BasicComponent from './BasicComponent'
import { Link }from 'react-router'
import Antd from 'antd'

var Breadcrumb = Antd.Breadcrumb; 
var commonAction = r2ActionCreator;
/**
 *  页面模块都应该继承这个类，该类继承越本框架最基层的BasicComponent。该封装了框架模块常用方法，路由参数（有改动），设置表单值
 * @prop {String} layout 默认为`page/layout`
 * @prop {String} titleSffix 默认需要配置
 * @prop {String} homLink 面包屑之主页设置 
 */
class ModuleComponent extends BasicComponent {
  constructor(props){
    super(props); 
  }

  createBreadcrumb(){
    if(this.props && this.props.children){
      var breadcrumb = this.props.children.props.breadcrumb;
      if(breadcrumb){
      var c_props = this.props.children.props;
      this.breadcrumb = (
        <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to={ this.props.homeLink.link }>
          { this.props.homeLink.label }
          </Link>
        </Breadcrumb.Item>
        {
          breadcrumb.map((v,k)=>{
          if(v.link){
            var link,label;
            if(Object.prototype.toString.apply(v.link) == "[object Function]"){
            link = v.link(c_props);
            }else{
            link = v.link;
            }
            if(Object.prototype.toString.apply(v.label) == "[object Function]"){
            label = v.label(c_props);
            }else{
            label = v.label;
            }
            return(
            <Breadcrumb.Item key={ k }>
              <Link to={ link }>
              { label }
              </Link>
            </Breadcrumb.Item>
            )
          }else{
            return(
            <Breadcrumb.Item key={ k }>
              { v.label }
            </Breadcrumb.Item>
            )
          }
          })
        }

        </Breadcrumb>
      ) 
      }else{
      this.breadcrumb = '';
      }

    }
  }

  /**
   * state方式设置表单值 
   * @param { String } inputid 自定义 
   */
  handleInputState(inputid){
  return {
    onChange: (e)=>{
    var state = { }
    if(!e.target){
      state[inputid] = e;
      this.setState(state);
    }else if(e.target.type == "checkbox"){
      if(e.target.checked){
      state[inputid] = e.target.value;
      this.setState(state);
      }else{
      state[inputid] = null;
      this.setState(state);
      }
    }else{
      state[inputid] = e.target.value;
      this.setState(state);
    }
    },
    value: this.state[inputid], 
  }
  }
  /**
   * Redex方式设置表单值
   * @param { String } inputid 自定义 
   */
  handleInputProps(inputid){
    var _this = this;
    return {
      onChange: function(e){
      //console.debug(e.target.type)
      if(!e.target){
        _this.props.dispatch(commonAction.inputAction(inputid,e));
      }else if(e.target.type == "checkbox"){
        if(e.target.checked){
        _this.props.dispatch(commonAction.inputAction(inputid,e.target.value));
        }else{
        _this.props.dispatch(commonAction.inputAction(inputid,null));
        }
      }else{
        _this.props.dispatch(commonAction.inputAction(inputid,e.target.value));
      }
      },
      value: _this.props.formInput[inputid], 
    }
  }

  render(){
    super.render()
    this.createBreadcrumb()
  }
}

ModuleComponent.defaultProps = {
  layout: "page/layout",
  titleSffix: r2Common.suffixTitle,
  homeLink: {
    label:<Antd.Icon type="home"/>,
    link:'/',
  },
};

module.exports = ModuleComponent
