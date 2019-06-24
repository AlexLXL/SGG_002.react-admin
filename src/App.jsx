import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from './pages/login'
import Admin from './pages/admin'
import './App.less'

export default function App() {
  return <div className="App">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Admin} />
    </Switch>
  </div>
}