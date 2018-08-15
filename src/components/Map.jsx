import React, { Component } from 'react'
import { Button, Typography } from '@material-ui/core'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import { markerIcon, loadingIcon, errorIcon } from '../mapElements'
import { chooseCluster } from '../data/utils'

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
    const { center, zoom, latitude, longitude, sightings } = this.state
    return (
      <div id="mapid">
        <Map 
          style={{height: "100vh", width: "100%"}}
          center={center}
          zoom={zoom}
          onclick={this.loadCluster}
          id="actualMap"
        > 
          <div id="mapHeader">
            <Typography variant="display1" style={{zIndex: '1000', color: '#fff' }}>Not Alone</Typography>
            <Typography variant="subheading" style={{zIndex: '1000', color: '#fff', position: 'absolute', top: '10vh'}}>An Interactive Visualization of UFO Sightings</Typography>
            <Typography variant="subheading" style={{zIndex: '1000', color: '#fff', position: 'absolute', top: '15vh'}}>US, 1949 - 2013</Typography>
            <Typography variant="subheading" style={{zIndex: '1000', color: '#fff', position: 'absolute', top: '20vh'}}>click map...if you dare</Typography>
          </div>
          <TileLayer  
            url="https://api.mapbox.com/styles/v1/ademsas/cjggt8ilb002k2rqw269apfqt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRlbXNhcyIsImEiOiJjamdncThncmIwMGw4MnhxbWNybnV1cDMwIn0.DmUIWxfIPjHyD-nu9GVqrw"
            attribution="data courtesy of the National UFO Reporting Center (NUFORC)"
          />
          { Array.isArray(sightings) && sightings.length
            && sightings.map(((sighting, index) => (
              <Marker key={index} position={[sighting.latitude, sighting.longitude]} icon={markerIcon} id="marker">
                <Popup >
                  <span id="popup">{`${sighting.city},  ${sighting.state}`}<br />{sighting.comments}<br/>{sighting.date}</span>
                </Popup>
              </Marker>
            )))
          }
          { !Array.isArray(sightings)
            && <Marker position={[latitude, longitude]} icon={errorIcon}>
                <Popup>
                  <span id="popup">We are all around you...just not here</span>
                </Popup>
              </Marker>
          }

         
        </Map>
      </div>
    )
  }
}


export default MapView