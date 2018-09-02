import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import Typist from 'react-typist'

const styles = {
  enter: {
    color: 'rgb(157, 252, 5)'
  }
}
export default class landingPage extends Component {
  constructor(){
    super()
    this.state = {
      showDescription: false
    }
    this.showDescription = this.showDescription.bind(this)
  }
  
  showDescription(){
    this.setState(prevState => ({ showDescription: !prevState.showDescription }))
  }

  render() {
    const { enterSite } = this.props
    const { showDescription } = this.state
    return (
      <div id="landingPage">
        <Typist
          onTypingDone={this.showDescription}
          cursor={{ show: false }}
          avgTypingDelay={100}
        >
          <h1 id="header">We Are Not Alone</h1>
        </Typist>
        { showDescription &&
          <div id="description">
            <Button onClick={enterSite} style={styles.enter}>Enter</Button>
          </div>
        }
        
      </div>
    )
  }
}
