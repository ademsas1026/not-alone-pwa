import database from '../secrets/firebase.config'
// import analyze from '../kmeans' --> the function that will generate a cluster given a lat / lng pair

/*--- Initial State ---*/
const initialState = {
  isLoading: false,
  error: false,
  sightings: []
}

/*--- Action Types ---*/
const GET_SIGHTINGS = 'GET_SIGHTINGS'
const GOT_ERROR = 'GOT_ERROR'
const NO_ERROR = 'NO_ERROR'
const IS_LOADING = 'IS_LOADING'
const NOT_LOADING = 'NOT_LOADING'

/* ---- Action Creators --- */
export const getSightings = sightings => ({
  type: GET_SIGHTINGS,
  sightings
})

const isLoading = () => ({
  type: IS_LOADING
})

const notLoading = () => ({
  type: NOT_LOADING
})

const gotError = () => ({
  type: GOT_ERROR
})

const noError = () => ({
  type: NO_ERROR
})

/* --- Thunks --- */
export const loadSightings = () => dispatch => {
  try {
    //reset error field to false
    dispatch(noError())
    dispatch(isLoading())
    // const { data } = await axios.get(`/api/sightings`) // replace with a request to firebase database
    const data = database.ref("sightings")
    //reset loading field to false
    dispatch(notLoading())
    let sightings = data.slice(0, 100)
    dispatch(getSightings(sightings))

  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }
}

export const loadSightingsByCluster = (latitude, longitude) => dispatch => {
  try {
    //reset error field to false
    dispatch(noError())
    dispatch(isLoading())
    let cluster = database.ref(`sightings/clusters/${latitude}/${longitude}`)
     /* if there's a cluster stored in a the database that corresponds to this lat / lng pair, then update redux state with that stored cluster
        otherwise: 
      1. generate cluster by running request through the clustering algorithm
      2. store cluster in database
      3. update redux state with the newly generated cluster */
    if (!cluster) {
      // cluster = analyze(latitude, longitude)
    } 
    dispatch(getSightings(cluster))
    dispatch(notLoading())
  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }
}

/* --- Reducer --- */
export default function (state = initialState, action){
  switch (action.type){
    case GET_SIGHTINGS:
      return {...state, sightings: action.sightings}
    case IS_LOADING: 
      return {...state, isLoading: true}
    case NOT_LOADING:
      return {...state, isLoading: false}
    case GOT_ERROR:
      return {...state, error: true}
    case NO_ERROR:
      return {...state, error: false}
    default:
      return state;
  }
}