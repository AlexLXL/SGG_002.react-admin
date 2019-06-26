import React, { Component } from 'react';
import { Modal } from 'antd';
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'

import {reqWeather} from '../../api'
import MyButton from '../my-button';
import './index.less';
import {getItem, removeItem} from "../../utils/storage-tools";
import menuList from '../../config/menu-config'

class HeaderMain extends Component {
  state = {
    sysTime: Date.now(),      // 这个是默认的？？
    dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
    weather: '晴'
  };

  componentWillMount() {
    this.username = getItem().username;
  }
  
  async componentDidMount() {
    this.timeID = setInterval(() => {
      this.setState({
        sysTime: Date.now()
      })
    },1000);

    const {promise, cancel} = reqWeather();  // 忘记写await，导致拿不到天气
    this.cancel = cancel;

    const result = await promise;

    if(result) {
      this.setState(result)
    }

    this.title = this.getTitle(this.props);
  }

  componentWillUnmount() {
    clearInterval(this.timeID); // 清除定时器
    this.cancel();  // 取消天气的ajax请求
  }

  componentWillReceiveProps(nexProps,nexContext) {
    this.title = this.getTitle(nexProps);
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

  /**
   * 获取title
   */
  getTitle = (props) => {     // 因为有定时器不停渲染render，所以要放在DidMount和componentwillreceiveprops
    let {pathname} = props.location;

    const pathnameReg = /^\/product\//;
    if(pathnameReg.test(pathname)) {
      pathname = '/product'
    }

    for (let i = 0, length = menuList.length; i < length; i++) {
      if(menuList[i].children) {
        for (let j = 0; j < menuList[i].children.length; j++) {
          if(menuList[i].children[j].key === pathname) {
            return menuList[i].children[j].title;
          }
        }
      }else if(menuList[i].key === pathname) {
        return menuList[i].title;
      }
    }
  };

  render() {
    const { sysTime, dayPictureUrl, weather } = this.state;

    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.username}</span>
        <MyButton onClick={this.logout}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">{this.title}</span>
        <div className="header-main-right">
          <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>    {/*上面设置了state，状态systime改变导致render，这里就重新渲染了一次*/}
          <img src={dayPictureUrl} alt=""/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(HeaderMain);