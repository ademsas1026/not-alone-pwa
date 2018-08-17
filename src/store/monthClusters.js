import { firebaseDatabase } from './index'

/*--- Initial State ---*/
const initialState = {
  isLoading: false,
  error: false,
  monthClusters: []
}

/*--- Action Types ---*/
const GET_MONTHS = 'GET_MONTHS'
const GOT_ERROR = 'GOT_ERROR'
const NO_ERROR = 'NO_ERROR'
const IS_LOADING = 'IS_LOADING'
const NOT_LOADING = 'NOT_LOADING'

/* ---- Action Creators --- */
const getMonthClusters = monthClusters => ({
  type: GET_MONTHS,
  monthClusters
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
export const loadMonthClusters = () => async dispatch => {
  try {
    dispatch(noError())
    dispatch(isLoading())
    const snapshot = await firebaseDatabase.ref("monthClusters")
    const monthClusters = snapshot.val().monthClusters
    dispatch(getMonthClusters(monthClusters))
    dispatch(notLoading())
  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }
}

/* --- Reducer --- */
export default function (state = initialState, action){
    switch(action.type) {
      case GET_MONTHS:
        return {...state, monthClusters: action.monthClusters }
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