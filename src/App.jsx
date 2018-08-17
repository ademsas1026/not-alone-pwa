import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'


import store from './store'
import history from './history'
import { Map } from './components'
import './App.css'



const App = () => (
    <Provider store={store}>
      <Router history={history}>
        <Map />
      </Router>
    </Provider>
  )


export default App
