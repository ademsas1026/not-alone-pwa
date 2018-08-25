import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Typography } from '@material-ui/core'

import { disableGeolocation } from '../store'
class Navbar extends Component {
  render() {
    const { changeClusterType, clusterType, disableGeolocation, accessUserLocation } = this.props
    return (
      <nav id="navbar">
        <div id="mapHeader">
          <Typography variant="display1" style={{ color: '#fff', marginLeft: '-50vw' }}>Not Alone</Typography>
        </div>
        <div id="navButtons">
          <Button onClick={() => changeClusterType('month', false)}>See Month Clusters</Button>
          <Button onClick={() => changeClusterType('kmeans', true)}>Sightings Near Me</Button>
          { accessUserLocation && <Button onClick={disableGeolocation}>Disable Geolocation</Button> } 
        </div>
      </nav>
    )
  }
}

const mapState = state => ({
  clusterType: state.selectedCluster.clusterType,
  accessUserLocation: state.accessUserLocation
})

const mapDispatch = dispatch => ({
  disableGeolocation(){
    dispatch(disableGeolocation())
  }
})

export default connect(mapState, null)(Navbar)


