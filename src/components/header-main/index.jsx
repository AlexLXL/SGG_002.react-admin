import React,{Component} from 'react';

import './header-main.less'

export default class HeaderMain extends Component{
  render() {
    return <div>
      <div className="header-main-top">
        <span>欢迎，</span>
        <span>xxx</span>
        <button className="my-button">退出</button>
      </div>
      <div className="header-main-bottom"></div>
    </div>
  }
}