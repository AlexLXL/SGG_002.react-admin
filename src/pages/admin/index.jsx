import React,{Component, Fragment} from 'react';
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
    isLoading: true,
    success: []
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  async componentWillMount() {
    const user = getItem();

    if(user && user._id) {  // 写少了_，不进入
      const result = await reqValidateUserInfo(user._id);
      if(result) {
        let menus = user.role.menus;
        return this.setState({    // 这里返回了下面的不会运行,这里是已经返回了结果的
          isLoading: false,
          success: menus.reverse()
        })
      }
    }

    this.setState({                 // 这里是还没有返回结果的
      isLoading: false,
      success: []
    });
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
    const { collapsed, isLoading, success } = this.state;

    if(isLoading) return null;

    return success ? <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <LeftNav collapsed={collapsed}/>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, minHeight: 100}}>
          <HeaderMain />
        </Header>
        <Content style={{ margin: '25px 16px' }}>
          <div style={{ background: '#fff', minHeight: 360 }}>
            <Switch>    {/* 权限管理的第二部分，动态生成路由，不然url输入能访问所有功能 */}
              {
                success.map((item) => { {/* 根据用户权限数组 遍历生成 [数组的home放最后，这样生成的路由列表重定向才在最后]*/}
                  switch (item) {
                    case '/home' :
                      return <Fragment key={item}><Route path="/home" component={Home}/><Redirect to="/home"/></Fragment>;
                    case '/category' :
                      return <Route key={item} path="/category" component={Category}/>;
                    case '/product' :
                      return  <Route key={item} path="/product" component={Product}/>;
                    case '/user' :
                      return <Route key={item} path="/user" component={User}/>;
                    case '/role' :
                      return <Route key={item} path="/role" component={Role}/>;
                    case '/charts/line' :
                      return <Route key={item} path="/charts/line" component={Line}/>;
                    case '/charts/bar' :
                      return <Route key={item} path="/charts/bar" component={Bar}/>;
                    case '/charts/pie' :
                      return <Route key={item} path="/charts/pie" component={Pie}/>;
                    default :
                      return null;
                  }
                })
              }
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          推荐使用谷歌浏览器，可以获得更佳页面操作体验
        </Footer>
      </Layout>
    </Layout> : <Redirect to="/login"/>
  }
}