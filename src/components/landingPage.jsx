import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import Typist from 'react-typist'

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
      <div>
        <Typist
          onTypingDone={this.showDescription}
        >
          We Are Not Alone
        </Typist>
        { showDescription &&
          <div id="description">
            <Button onClick={enterSite}>Enter</Button>
          </div>
        }
        
      </div>
    )
  }
}
