import React,{Component} from 'react';
import {Icon, Menu} from "antd";
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'

import './leftNav.less'

const { SubMenu, Item } = Menu;

export default class LeftNav extends Component{
  render() {
    return <div>
      <Link className="left-nav-logo" to="/home">
        <img src={logo} alt="left-nav-logo"/>
        <h1>硅谷后台</h1>
      </Link>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Item key="1">
          <Icon type="home" />
          <span>首页</span>
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
            <Icon type="bars" />
            <span>品类管理</span>
          </Item>
          <Item key="3">
            <Icon type="tool" />
            <span>商品管理</span>
          </Item>
        </SubMenu>
        <Item key="4">
          <Icon type="user" />
          <span>用户管理</span>
        </Item>
        <Item key="5">
          <Icon type="pull-request" />
          <span>权限管理</span>
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
            <Icon type="fund" />
            <span>柱形图</span>
          </Item>
          <Item key="7">
            <Icon type="fund" />
            <span>折线图</span>
          </Item>
          <Item key="8">
            <Icon type="fund" />
            <span>饼图</span>
          </Item>
        </SubMenu>
      </Menu>
    </div>
  }
}