import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { withRouter } from 'react-router-dom'

import { markerIcon, loadingIcon, errorIcon } from '../mapElements'
import { chooseCluster } from '../data/utils'
// const { mostCommonWords, allDataCommonWords } = require('../../script/prepData')

// add click handler that makes use of this.props.dbRef
class MapView extends Component {
  constructor() {
    super()
    this.state = {
      center: [36.8, -98],
      zoom: 3.5,
      latitude: 0.00,
      longitude: 0.00,
      sightings: []
    }
    this.loadCluster = this.loadCluster.bind(this)
  }

  async loadCluster(event) {
    await this.setState({ latitude: event.latlng.lat, longitude: event.latlng.lng })
    const { dbRef } = this.props
    if (dbRef) {
      const snap = await dbRef.once('value')
      const cluster = chooseCluster(snap.val(), this.state.longitude, this.state.latitude )
      await this.setState({ sightings: cluster }) 
    }
  }
  
  render() {
    console.log('this.state: ', this.state, 'map props: ', this.props)
    const { center, zoom, latitude, longitude } = this.state
    return (
      <div id="mapid">
        <Map 
          style={{height: "100vh", width: "55%", zIndex: '500'}}
          center={center}
          zoom={zoom}
          onclick={this.loadCluster}
          id="actualMap"
        >
          <TileLayer  
            url="https://api.mapbox.com/styles/v1/ademsas/cjggt8ilb002k2rqw269apfqt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRlbXNhcyIsImEiOiJjamdncThncmIwMGw4MnhxbWNybnV1cDMwIn0.DmUIWxfIPjHyD-nu9GVqrw"
            attribution="data courtesy of the National UFO Reporting Center (NUFORC)"
          />
        </Map>
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