import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router'
import { Provider } from 'react-redux'
import firebase from 'firebase'

import store from './store'
import history from './history'
import { Map } from './components'
import './App.css'
import firebaseConfigs from './secrets/firebase.config'

firebase.initializeApp(firebaseConfigs)


const App = () => (
    <Provider store={store}>
      <Router history={history}>
        <Map dbRef={firebase.database()}/>
      </Router>
    </Provider>
  )


export default App
