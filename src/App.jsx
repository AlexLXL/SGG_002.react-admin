import React,{Component} from 'react';
import Login from './pages/login'
import './App.less'

export default class App extends Component{
  render() {
    return <div className="App">
      <Login />
    </div>
  }
}