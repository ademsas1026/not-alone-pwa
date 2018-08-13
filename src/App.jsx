import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router'
import { Provider } from 'react-redux'
import firebase from 'firebase'

import store from './store'
import history from './history'
import { Map } from './components'
import './App.css'
import firebaseConfigs from './secrets/firebase.config'
import { generateClusters } from './scripts/main'

firebase.initializeApp(firebaseConfigs)



class App extends Component {
  constructor(){
    super()
    this.state = {
      sightings: []
    }
  }

  componentDidMount(){
    const dbRef = firebase.database().ref("staging")
    console.log('this is db ref: ', dbRef.child("sightings"), 'this is firebase: ', firebase)
    dbRef.once('value').then(async snap => {
      const clusters = await generateClusters(snap.val().sightings)
      console.log('md', clusters)
      let newCluster
      clusters.forEach(cluster => {
        newCluster = dbRef.child("clusters").push()
        newCluster.set(cluster)
      })
    })
  }
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
