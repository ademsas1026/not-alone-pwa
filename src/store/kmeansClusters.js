import { firebaseDatabase } from './index'

/*--- Initial State ---*/
const initialState = {
  isLoading: false,
  error: false,
  kmeansClusters: []
}

/*--- Action Types ---*/
const GET_KMEANS = 'GET_KMEANS'
const GOT_ERROR = 'GOT_ERROR'
const NO_ERROR = 'NO_ERROR'
const IS_LOADING = 'IS_LOADING'
const NOT_LOADING = 'NOT_LOADING'

/* ---- Action Creators --- */
const getKmeansClusters = kmeansClusters => ({
  type: GET_KMEANS,
  kmeansClusters
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
export const loadKmeansClusters = () => async dispatch => {
  try {
    dispatch(noError())
    dispatch(isLoading())
    const snapshot = await firebaseDatabase.ref("kmeansClusters")
    const kmeansClusters = snapshot.val().clusters
    dispatch(getKmeansClusters(kmeansClusters))
    dispatch(notLoading())
  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }
}

/* --- Reducer --- */
export default function (state = initialState, action){
    switch(action.type) {
      case GET_KMEANS:
        return {...state, kmeansClusters: action.kmeansClusters }
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