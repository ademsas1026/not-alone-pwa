import React, { Component } from 'react'
import { Button, Typography } from '@material-ui/core'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import { markerIcon, loadingIcon, errorIcon } from '../mapElements'
import { chooseCluster, chooseMonthCluster, months } from '../data/utils'
import { Chart, MapHeader, Menu } from './index'
import { mapStyles } from './styleUtils'

class MapView extends Component {
  constructor() {
    super()
    this.state = {
      center: [36.8, -98],
      zoom: 3.5,
      latitude: 0.00,
      longitude: 0.00,
      sightings: [],
      chartInView: false,
      selectByMonth: false,
      monthClusters: []
    }
    this.loadCluster = this.loadCluster.bind(this)
    this.loadMonthCluster = this.loadMonthCluster.bind(this)
    this.showChart = this.showChart.bind(this)
    this.selectByMonth = this.selectByMonth.bind(this)
  }

  async componentDidMount() {
    const { dbRef } = this.props
    if (dbRef) {
      const snap = await dbRef.ref("clusters").once('value')
      await this.setState({ monthClusters: snap.val().monthClusters }) 
    }
  }

  async loadCluster(event) {
    await this.setState({ latitude: event.latlng.lat, longitude: event.latlng.lng })
    const { dbRef } = this.props
    if (dbRef) {
      const snap = await dbRef.ref("clusters").once('value')
      const cluster = chooseCluster(snap.val(), this.state.longitude, this.state.latitude )
      await this.setState({ sightings: cluster }) 
    }
  }

  async loadMonthCluster(month, event) {
    const { dbRef } = this.props
    if (dbRef) {
      const snap = await dbRef.ref("monthClusters").once('value')
      const monthCluster = chooseMonthCluster(month, snap.val())
      await this.setState({ sightings: monthCluster })
    }
  }

  async showChart() {
    await this.setState(prevState => ({ chartInView: !prevState.chartInView }))
  }

  async selectByMonth() {
    await this.setState(prevState => ({ selectByMonth: !prevState.selectByMonth }))
  }

  
  render() {
    const { center, zoom, latitude, longitude, sightings, chartInView, selectByMonth, monthClusters } = this.state
    
    return (
      <div id="mapid">
        <Map 
          style={ chartInView ? mapStyles.chartInView : mapStyles.noChart }
          center={center}
          zoom={zoom}
          onclick={this.loadCluster}
          id="actualMap"
        > 
          <MapHeader />
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
        { sightings.length && <Button onClick={this.showChart} style={mapStyles.showChartBtn}>Word Frequency Per Cluster</Button> }
        <Menu selectByMonth={this.selectByMonth} loadMonthCluster={this.loadMonthCluster} monthClusters={monthClusters} />
        { Array.isArray(sightings) && sightings.length && chartInView
            && <Chart sightings={sightings} showChart={this.showChart}/>
          }
      </div>
    )
  }
}


export default MapView