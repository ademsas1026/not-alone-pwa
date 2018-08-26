/*--- Initial State ---*/
const initialState = {
  accessUserLocation: false
}

/*--- Action Types ---*/
const ACCESS_LOCATION = 'ACCESS_LOCATION'

/*--- Action Creators ---*/
export const allowAccessToLocation = allowAccess => ({
  type: ACCESS_LOCATION,
  allowAccess
})

export const disableGeolocation = () => ({
  type: ACCESS_LOCATION,
  allowAccess: false
})

/*--- Reducer ---*/
export default function(state = initialState, action){
  switch(action.type){
    case ACCESS_LOCATION:
      return {...state, accessUserLocation: action.allowAccess}
    default:
      return state
  }
}