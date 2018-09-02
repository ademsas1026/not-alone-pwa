import React, { Component } from 'react'
import { Router, Switch } from 'react-router'
import { Provider } from 'react-redux'


import store from './store'
import history from './history'
import { Map, LandingPage } from './components'
import './App.css'


class App extends Component {
  constructor(){
    super()
    this.state = {
      enterSite: false
    }
    this.enterSite = this.enterSite.bind(this)
  }

  enterSite(){
    this.setState({ enterSite: true })
  }
    render(){
      const { enterSite } = this.state
      return (
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              { !enterSite && <LandingPage enterSite={this.enterSite} />}
              { enterSite && <Map /> }
            </Switch>
          </Router>
        </Provider>
      )
  }
}



export default App