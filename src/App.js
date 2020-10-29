import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Hirarki from './containers/HirarkiIndex'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/hirarki' component={Hirarki} />
      </Switch>
    </Router>
  )
}