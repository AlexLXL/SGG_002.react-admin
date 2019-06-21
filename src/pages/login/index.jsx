import React,{Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';

import logo from './logo.png'
import './login.less'

const Item = Form.Item;

export default class Index extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
  };
  
  render() {
    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section>
        <h2>用户登录</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Item>
            <Input prefix={<Icon type="user" />} placeholder="用户名" className="login-input"/>
          </Item>
          <Item>
            <Input prefix={<Icon type="lock" />} type="password" placeholder="密码" className="login-input"/>
          </Item>
          <Item>
            <Button htmlType="submit" type="primary" className="login-button">登录</Button>
          </Item>
        </Form>
      </section>
    </div>
  }
}