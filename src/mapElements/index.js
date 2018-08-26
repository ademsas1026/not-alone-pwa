import Leaflet from 'leaflet'


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

const corner1 = Leaflet.latLng(64.11419975101958, -177.09960937500003)
const corner2 = Leaflet.latLng(13.042689780383594, -49.6142578125)
export const bounds = Leaflet.latLngBounds(corner1, corner2)

