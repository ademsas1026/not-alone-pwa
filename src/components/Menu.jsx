import React, { Component } from 'react'
import { IconButton, Menu, MenuItem, Button } from '@material-ui/core'
import { chooseCluster, chooseMonthCluster, months } from '../data/utils'

export default class MyMenu extends Component {
  constructor(){
    super()
    this.state = {
      anchorEl: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClick(event) {
    const { loadMonthCluster, monthClusters } = this.props
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose() {
    this.setState({ anchorEl: null })
  }
  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const ITEM_HEIGHT = 48
    return (
      <div style={{zIndex: '1000000', position: 'absolute', left: '6vw', top: '50vh'}}>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null }
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Button style={{color: 'green', zIndex: '-10000'}}>Sightings By Month</Button>
        </IconButton>
        <Menu 
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            },
          }}
        >
        { months.map(month => (
          <MenuItem
            key={month}
            selected={month === 'June'}
          >
            { month }
          </MenuItem>
        ))}
        </Menu>
      </div>
    )
  }
}


