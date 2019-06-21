import React,{Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';

import logo from './logo.png'
import './login.less'

const Item = Form.Item;

class Login extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, value) => { // this.props.form.validateFields 拿表单错误和收集表单数据
      // console.log(errors, value)
      if(!errors) {
        const { username, password } = value;
        console.log(username, password)
      }else {
        console.log(errors)
      }
    })
  };

  validator = (rule, value, callback) => {   // 用来做表单验证，在getFieldDecorator的rules里面
    if(!value){
      callback('密码必须输入')
    }else if(!/^\w+$/.test(value)) {
      callback('密码只能包含字母、数字、下划线')
    }else if(value.length < 4) {
      callback('密码最小长度4位')
    }else if(value.length > 15) {
      callback('密码最大长度15位')
    }else {
      callback()
    }
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;  // 用于和表单进行双向绑定,getFieldDecorator也是一个高阶组件

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Item>
            {
              getFieldDecorator('username',{
                rules: [
                  /*{required: true, message: '用户名必须输入'},
                  {min: 4,message: '用户名最小长度4位'},
                  {max: 15,message: '用户名最大长度15位'},
                  {pattern: /^\w+$/, message: '用户名只能包含字母、数字、下划线'}*/

                  { validator: this.validator }
                ]
              })(<Input prefix={<Icon type="user" />} placeholder="用户名" className="login-input"/>)
            }
          </Item>
          <Item>
            {
              getFieldDecorator('password',
                {
                  rules: [
                    { validator: this.validator }
                    ]
                })(<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" className="login-input"/>)
            }
          </Item>
          <Item>
            <Button htmlType="submit" type="primary" className="login-button">登录</Button>
          </Item>
        </Form>
      </section>
    </div>
  }
}

// 返回值是一个包装组件   <Form(Login)><Login></Form(Login)>
// 通过Form(Login)包装组件向Login组件中传递form属性
export default Form.create()(Login) // Form.creat()()高阶组件

