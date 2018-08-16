import React, { Component } from 'react'
import { Menu } from './index'

export default class Navbar extends Component {
  render() {
    return (
      <nav style={{display: 'flex', position: 'absolute', left: '10vw'}}>
        <Menu />
      </nav>
    )
  }
}
