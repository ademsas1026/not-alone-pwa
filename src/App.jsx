import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router'
import { Provider } from 'react-redux'

import store from './store'
import history from './history'
import { Map } from './components'
import './App.css'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Map />
        </Router>
      </Provider>
    )
  }
}

export default App
