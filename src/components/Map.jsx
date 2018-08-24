import React, { Component } from 'react'
import { connect, withRouter } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import { markerIcon, loadingIcon, errorIcon } from '../mapElements'
import { loadKmeansClusters, loadMonthClusters, chooseCluster } from '../store'

class MapView extends Component {
  constructor() {
    super()
    this.state = {
      center: [36.8, -98],
      zoom: 3.5,
      latitude: 0.00,
      longitude: 0.00,
      clusterType: 'kmeans',
      month: 'January'
    }
    this.loadCluster = this.loadCluster.bind(this)
  }

  async componentDidMount(){
    const { loadMonthClusters, loadKmeansClusters } = this.props
    await loadMonthClusters()
    await loadKmeansClusters()
  }

  async loadCluster(event) {
    await this.setState({ latitude: event.latlng.lat, longitude: event.latlng.lng })
    const { clusterType, month } = this.state
    const { chooseCluster, kmeansClusters, monthClusters } = this.props
    switch(clusterType){
      case 'kmeans':
        await chooseCluster(kmeansClusters, clusterType, null, this.state.longitude, this.state.latitude)
        break
      case 'month':
        await chooseCluster(monthClusters, clusterType, month, null, null)
        break
      default:
        return null
    }
  
  }
  
  render() {
    const { center, zoom, latitude, longitude } = this.state
    const { selectedCluster } = this.props
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
          { selectedCluster.length
            && selectedCluster.map(((sighting, index) => (
              <Marker key={index} position={[sighting.latitude, sighting.longitude]} icon={markerIcon} id="marker">
                <Popup >
                  <span id="popup">{`${sighting.city},  ${sighting.state}`}<br />{sighting.comments}<br/>{sighting.date}</span>
                </Popup>
              </Marker>
            )))
          }
          { !Array.isArray(selectedCluster)
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

const mapState = state => ({
  selectedCluster: state.selectedCluster.selectedCluster,
  singleClusterError: state.selectedCluster.error,
  singleClusterLoading: state.selectedCluster.isLoading,
  kmeansClusters: state.kmeansClusters.kmeansClusters,
  kmeansClustersError: state.kmeansClusters.error,
  kmeansClustersLoading: state.kmeansClusters.isLoading,
  monthClusters: state.monthClusters.monthClusters,
  monthClustersError: state.monthClusters.error,
  monthClustersLoading: state.monthClusters.isLoading
})

const mapDispatch = dispatch => ({
  chooseCluster(clusters, clusterType, month = null, latitude = null, longitude = null){
    dispatch(chooseCluster(clusters, clusterType, month, latitude, longitude))
  },
  loadKmeansClusters(){
    dispatch(loadKmeansClusters())
  },
  loadMonthClusters(){
    dispatch(loadMonthClusters())
  }
})

export default connect(mapState, mapDispatch)(MapView)