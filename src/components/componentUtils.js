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
      console.log('startPos', startPos)
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