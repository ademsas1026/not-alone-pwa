import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { withRouter } from 'react-router-dom'

import { markerIcon, loadingIcon, errorIcon } from '../mapElements'
// import { loadSightingsByCluster } from '../store'
// const { mostCommonWords, allDataCommonWords } = require('../../script/prepData')


class MapView extends Component {
  constructor() {
    super()
    this.state = {
      center: [36.8, -98],
      zoom: 3.5,
      latitude: 0.00,
      longitude: 0.00
    }
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

/*--- Container ---*/
const mapState = state => ({
  sightings: state.sightings.sightings,
  loading: state.sightings.isLoading,
  error: state.sightings
})

const mapDispatch = dispatch => ({
  // loadSightingsByCluster(latitude, longitude) {
  //   dispatch(loadSightingsByCluster(latitude, longitude))
  // }
})
export default withRouter(connect(mapState, mapDispatch)(MapView))