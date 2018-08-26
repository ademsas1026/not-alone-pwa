import React, { Component } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { chooseMonthCluster } from '../data/utils';

const ITEM_HEIGHT = 48
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December']

export default class LongMenu extends Component {
  render() {
    const { closeMenu, open, anchorEl } = this.props
    return (
      <div>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
              zIndex: '5000'
            },
          }}
        >
          {months.map(month => (
            <MenuItem style={{zIndex: '5000'}} key={month} selected={month === 'January'} onClick={() => closeMenu(month)}>
              {month}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}
