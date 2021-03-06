import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import { markerIcon, errorIcon, bounds } from '../mapElements'
import { getLocation } from './componentUtils'
import { loadKmeansClusters, loadMonthClusters, chooseCluster, changeClusterType, allowAccessToLocation } from '../store'
import { Navbar, Chart } from './index'



class MapView extends Component {
  constructor() {
    super()
    this.state = {
      center: [36.8, -98],
      zoom: 3.5,
      latitude: 0.00,
      longitude: 0.00,
      month: 'January',
      showChart: false,
      bounds
    }
    this.loadCluster = this.loadCluster.bind(this)
    this.changeClusType = this.changeClusType.bind(this)
    this.showChart = this.showChart.bind(this)
    this.hideChart = this.hideChart.bind(this)
    this.chooseMonth = this.chooseMonth.bind(this)
  }

  async componentDidMount(){
    const { loadMonthClusters, loadKmeansClusters, accessUserLocation } = this.props
    await loadMonthClusters()
    await loadKmeansClusters()
    if (accessUserLocation) getLocation() // sets userCoords on window.localStorage
  }
 
  async loadCluster(event) {
    const [latitude, longitude] = event.latlng 
      ? [event.latlng.lat, event.latlng.lng] // from map click handler
      : [event.latitude, event.longitude] // from window.localStorage
    console.log('latlng pair for corners: ', latitude, longitude)
    await this.setState({ latitude, longitude })
    const { month } = this.state
    const { chooseCluster, kmeansClusters, monthClusters, clusterType } = this.props
    switch(clusterType){
      case 'kmeans':
        await chooseCluster(kmeansClusters, clusterType, null, this.state.longitude, this.state.latitude)
        await this.setState({ center: [latitude, longitude], zoom: 6})
        break
      case 'month':
        console.log('choosing month cluster', chooseCluster(monthClusters, clusterType, month, null, null))
        break
      default:
        return null
    }
  
  }

  async changeClusType(clusterType, accessLocation){
    const { changeClusterType, accessUserLocation, allowAccessToLocation } = this.props
    await changeClusterType(clusterType)
    if (accessLocation) {
      let permissionGranted = accessUserLocation
        ? window.alert('You have allowed this application to access your location. To disable geolocation, click the disable geolocation button in navbar.')
        : window.confirm('Allow this application to access your location?')
      if (permissionGranted) allowAccessToLocation(true)
      else allowAccessToLocation(false)
      if (accessUserLocation) {
        await getLocation() // sets userCoords on window.localStorage
        const latitude = window.localStorage.getItem('userLatitude')
        const longitude = window.localStorage.getItem('userLongitude')
        this.loadCluster({ latitude, longitude })
      }
    }
  }

  showChart(){
    this.setState({ showChart: true })
  }

  hideChart(){
    this.setState({ showChart: false })
  }

  chooseMonth(month){
    console.log(month)
    this.setState({ month })
  }
  
  render() {
    const { center, zoom, latitude, longitude, showChart, bounds, month } = this.state
    const { selectedCluster, clusterType } = this.props
    return (
      <div id="mapid">
        <Navbar
          changeClusterType={this.changeClusType}
          showChart={this.showChart}
          showChartState={showChart}
          hideChart={this.hideChart}
          chooseMonth={this.chooseMonth}
        />
        { showChart 
          ? <Chart latitude={latitude} longitude={longitude} clusterType={clusterType} month={month}/>
          : <Map 
              style={{height: "100vh", width: "100%"}}
              center={center}
              zoom={zoom}
              onclick={this.loadCluster}
              id="actualMap"
              maxBounds={bounds}
            > 
         
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
        }
      </div>
    )
  }
}

const mapState = state => ({
  accessUserLocation: state.accessUserLocation,
  clusterType: state.selectedCluster.clusterType,
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
  },
  changeClusterType(clusterType = 'kmeans'){
    dispatch(changeClusterType(clusterType))
  },
  allowAccessToLocation(allowAccess){
    dispatch(allowAccessToLocation(allowAccess))
  }
})

export default withRouter(connect(mapState, mapDispatch)(MapView))