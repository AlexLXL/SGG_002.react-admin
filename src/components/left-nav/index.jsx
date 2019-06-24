import React,{Component} from 'react';
import {Icon, Menu} from "antd";
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import menuList from '../../config/menu-config'

import logo from '../../assets/images/logo.png'
import './leftNav.less'

const { SubMenu, Item } = Menu;

class LeftNav extends Component{
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  };

  createMenu = (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
      </Link>
    </Item>
  };

  componentWillMount() {
    const {pathname} = this.props.location;

    this.menus = menuList.map((menu) => {
      const children = menu.children;

      if (children) { // 二级菜单
        return <SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </span>
          }
        >
          {
            children.map((item) => {
              if(item.key === pathname) {
                (this.openKey = menu.key)
              }
              return this.createMenu(item);
            })
          }
        </SubMenu>;
      } else {
        return this.createMenu(menu); // 一级
      }
    });
    this.selectedKey = pathname
  }

  render() {
    const { collapsed } = this.props;

    return <div>
      <Link className="left-nav-logo" to="/home">
        <img src={logo} alt="left-nav-logo"/>
        <h1 style={{display: collapsed ? 'none' : 'block'}}>硅谷后台</h1>
      </Link>
      <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openKey]} mode="inline">  { /* 默认打开[this.openkey] === defaultSelectedKeys={[this.selectedKey]} 传的是数组和/home这样的路径 & 注意defaultOpenKeys={[this.openKey]}这里有一个[]*/ }
        {
          this.menus
        }
        {/*<Item key="1">
          <Link to="/home">
            <Icon type="home" />
            <span>首页</span>
          </Link>
        </Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="appstore" />
              <span>商品</span>
            </span>
          }
        >
          <Item key="2">
            <Link to="/category">
              <Icon type="bars" />
              <span>品类管理</span>
            </Link>
          </Item>
          <Item key="3">
            <Link to="product/index">
              <Icon type="tool" />
              <span>商品管理</span>
            </Link>
          </Item>
        </SubMenu>
        <Item key="4">
          <Link to="/user">
            <Icon type="user" />
            <span>用户管理</span>
          </Link>
        </Item>
        <Item key="5">
          <Link to="/role">
            <Icon type="pull-request" />
            <span>权限管理</span>
          </Link>
        </Item>
        <SubMenu
          key="sub2"
          title={
            <span>
                  <Icon type="area-chart" />
                  <span>图表图形</span>
                </span>
          }
        >
          <Item key="6">
            <Link to="/charts/bar">
              <Icon type="fund" />
              <span>柱形图</span>
            </Link>
          </Item>
          <Item key="7">
            <Link to="/charts/line">
              <Icon type="fund" />
              <span>折线图</span>
            </Link>
          </Item>
          <Item key="8">
            <Link to="/charts/pie">
              <Icon type="fund" />
              <span>饼图</span>
            </Link>
          </Item>
        </SubMenu>*/}
      </Menu>
    </div>
  }
}

export default withRouter(LeftNav); // 传递组件的三大属性，然后那pathname来open下拉菜单