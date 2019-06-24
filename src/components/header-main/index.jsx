import React, { Component } from 'react';
import { Modal } from 'antd';
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'

import {reqWeather} from '../../api'
import MyButton from '../my-button';
import './index.less';
import {getItem, removeItem} from "../../utils/storage-tools";

class HeaderMain extends Component {
  state = {
    sysTime: Date.now(),      // 这个是默认的？？
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png',
    weather: '晴'
  };

  componentWillMount() {
    this.username = getItem().username;
  }
  
  componentDidMount() {
    setInterval(() => {
      this.setState({
        sysTime: Date.now()
      })
    },1000);

    const result = reqWeather();
    if(result) {
      this.setState(result)
    }
  }

  logout = () => {
    Modal.confirm({
      title: '确定要退出当前账号吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        removeItem();   // 记得把localStorage清了
        this.props.history.replace('/login');
      }
    })
  };

  render() {
    const { sysTime, weatherImg, weather } = this.state

    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.username}</span>
        <MyButton onClick={this.logout}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">用户管理</span>
        <div className="header-main-right">
          <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>    {/*上面设置了state，状态systime改变导致render，这里就重新渲染了一次*/}
          <img src={weatherImg} alt=""/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(HeaderMain);