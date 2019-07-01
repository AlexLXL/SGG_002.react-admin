import React,{Component} from 'react';
import {Icon, Menu} from "antd";
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import menuList from '../../config/menu-config'
import logo from '../../assets/images/logo.png'
import './leftNav.less'
import {getItem} from '../../utils/storage-tools'

const { SubMenu, Item } = Menu;

class LeftNav extends Component{
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
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
    let {pathname} = this.props.location;
    let isHome = true;    // 用于url输入 / 时left-nav有默认选中
    const pathnameReg = /^\/product\//;
    const menus = getItem().role.menus;

    if(pathnameReg.test(pathname)) {
      pathname = '/product'
    }

    this.menus = menuList.reduce((prev, curr) => {    // 权限管理就是根据配置文件和权限数组生成当前用户的配置文件
      const children = curr.children;

      if (children) { // 二级菜单
        let isShowSubMenu = false;
        const subMenu =  <SubMenu
          key={curr.key}
          title={
            <span>
              <Icon type={curr.icon} />
              <span>{curr.title}</span>
            </span>
          }
        >
          {
            children.reduce((prev, current) => {
              const menu = menus.find((menu) => menu === current.key);

              if (menu) {
                if (current.key === pathname) {
                  // 说明当前地址是一个二级菜单，需要展开一级菜单
                  // 初始化展开的菜单
                  this.openKey = curr.key;
                  isHome = false;
                }
                // 找到了显示
                isShowSubMenu = true;
                return [...prev, this.createMenu(current)];
              } else {
                return prev;
              }
            },[])
          }
        </SubMenu>;

        return isShowSubMenu ? [...prev, subMenu] : prev;
      } else {  // 一级
        const menu = menus.find((menu) => menu === curr.key);

        if(menu) {
          if (curr.key === pathname) isHome = false;
          // 匹配上就添加进行，将来会显示菜单
          return [...prev, this.createMenu(curr)];
        } else {
          return prev;
        }
      }
    }, []);
    this.selectedKey = isHome ? '/home' : pathname;
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
      </Menu>
    </div>
  }
}

export default withRouter(LeftNav); // 传递组件的三大属性，然后那pathname来open下拉菜单