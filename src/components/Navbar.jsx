import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Typography } from '@material-ui/core'

import { disableGeolocation, getWindowSize } from '../store'
import { Menu } from './index'

class Navbar extends Component {
  constructor(){
    super()
    this.state = {
      hideHeader: false,
      anchorEl: null
    }
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  openMenu(event){
    this.setState({ anchorEl: event.currentTarget })
  }

  closeMenu(month){
    this.props.chooseMonth(month)
    this.setState({ anchorEl: null })
  }

  async componentDidMount(){
    await getWindowSize()
    const { smallWindow } = this.props
    await this.setState({ hideHeader: smallWindow })
  }


  render() {
    const { changeClusterType, clusterType, disableGeolocation, accessUserLocation, showChart, hideChart, showChartState } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    console.log('window.innerWidth', window.innerWidth)
    return (
      <nav id="navbar">
        <div id="mapHeader">
          {!this.props.windowSmall && <Typography variant="display1" style={{ color: '#fff', marginLeft: '-40vw' }}>Not Alone</Typography>}
        </div>
        <div id="navButtons">
          <Button onClick={() => changeClusterType('kmeans', true)} style={{zIndex: '5000', color: '#fff'}}>Sightings Near Me</Button>
          { showChartState
            ? <Button onClick={hideChart} style={{color: '#fff'}}>Back to Map</Button> 
            : <Button onClick={showChart} style={{color: '#fff'}}>Analyze Word Frequency</Button> 
          }
          <Button 
            onClick={(event) => {
              this.openMenu(event)
              changeClusterType('month', false)
            }} 
            style={{zIndex: '5000', color: '#fff'}}
            aria-label="More"
            aria-owns={open ? 'long-menu' : null}
            >
            See Month Clusters
          </Button>
          <Menu anchorEl={anchorEl} open={open} closeMenu={this.closeMenu} />
          { accessUserLocation && <Button onClick={disableGeolocation} style={{color: '#fff'}}>Disable Geolocation</Button> } 
        </div>
      </nav>
    )
  }
}

const mapState = state => ({
  clusterType: state.selectedCluster.clusterType,
  accessUserLocation: state.accessUserLocation,
  smallWindow: state.smallWindow.smallWindow
})

const mapDispatch = dispatch => ({
  disableGeolocation(){
    dispatch(disableGeolocation())
  },
  getWindowSize(){
    dispatch(getWindowSize())
  }
})

export default connect(mapState, mapDispatch)(Navbar)


