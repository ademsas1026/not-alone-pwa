import axios from 'axios'

export const getLocation = () => {
  // window.onload = () => {
    let startPos
    
    const geoOptions = {
      // use a recently obtained geolocation result
      maximumAge: 5 * 60 * 1000,
      // max request time - send response after this much time, no matter what it is
      timeout: 100 * 1000
    }
    const geoSuccess = position => {
      startPos = position
      window.localStorage.setItem('userLatitude', startPos.coords.latitude)
      window.localStorage.setItem('userLongitude', startPos.coords.longitude)
    }

    const geoError = error => {
      console.log('error occured. error code: ' + error.code)
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions)

    console.log('getting user latitude: ', window.localStorage.getItem('userLatitude'))
  // }
}

export const reverseGeocode = async latlng => {
  latlng = latlng.split(',')
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}`
  let { data } = await axios.get(url)
  const firstAddress = data.results[0].address_components
  let city = firstAddress.filter(addressComponents => addressComponents.types.includes("sublocality") || addressComponents.types.includes("locality"))
  city = city[0] ? city[0].long_name : ''
  let state = firstAddress.filter(addressComponents => addressComponents.types.includes("administrative_area_level_1"))
  state = state[0] ? state[0].long_name : ''
  return { city, state }
}