import Leaflet from 'leaflet'
// import 'alien-head.png'
// import 'ufo-icon.png'
// import 'error-alien.png'
export const markerIcon = new Leaflet.Icon({
  iconUrl: 'images/ufo-icon.png', 
  iconSize: [38, 38], 
  iconAnchor: [13, 16], //point of the icon which will correspond to the marker
  popupAnchor: [-3, -76] //point from which the popup should open relative to the iconAnchor
})

export const loadingIcon = new Leaflet.Icon({
  iconUrl: 'images/alien-head.png',
  iconSize: [38, 38], 
  iconAnchor: [13, 16], //point of the icon which will correspond to the marker
  popupAnchor: [-3, -76] //point from which the popup should open relative to the iconAnchor
})

export const errorIcon = new Leaflet.Icon({
  iconUrl: 'images/error-alien.png',
  iconSize: [38, 38], 
  iconAnchor: [13, 16], //point of the icon which will correspond to the marker
  popupAnchor: [-3, -76] //point from which the popup should open relative to the iconAnchor
})

export const latlng = (latitude, longitude) => new Leaflet.latLng(latitude, longitude)