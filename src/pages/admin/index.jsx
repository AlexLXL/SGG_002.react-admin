import React,{Component} from 'react';
import { Layout } from 'antd';
import {Route, Switch, Redirect} from 'react-router-dom'

import LeftNav from '../../components/left-nav'
import HeaderMain from '../../components/header-main'
import {getItem} from "../../utils/storage-tools";
import {reqValidateUserInfo} from "../../api";
import Home from '../home'
import Category from '../category'
import Product from '../product'
import User from '../user'
import Role from '../role'
import Bar from '../charts-bar'
import Line from '../charts-line'
import Pie from '../charts-pie'

const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends Component{
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  async componentWillMount() {
    const user = getItem();

    if(user && user._id) {  // 写少了_，不进入
      const result = await reqValidateUserInfo(user._id);
      if(result) return
    }

    this.props.history.replace('/login');

    /*if(!user || !user._id) {
      // === 没有id的时候直接跳转login ===
      this.props.history.replace('/login');
    }else {
      // === 有id的时候呀验证id是否伪造 ===
      const result = await reqValidateUserInfo(user._id);   // ajax发回来的都是data.data
      if(!result) {
        this.props.history.replace('/login');
      }
    }*/
  }

  render() {
    const {collapsed} = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <LeftNav collapsed={collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, minHeight: 100}}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: '25px 16px' }}>
            <div style={{ background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/category" component={Category}/>
                <Route path="/product" component={Product}/>
                <Route path="/user" component={User}/>
                <Route path="/role" component={Role}/>
                <Route path="/charts/bar" component={Bar}/>
                <Route path="/charts/line" component={Line}/>
                <Route path="/charts/pie" component={Pie}/>
                <Redirect to="/home"/>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}